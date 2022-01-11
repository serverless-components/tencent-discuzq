const { Component } = require('@serverless/core')
const { ApiTypeError, ApiError } = require('tencent-component-toolkit/lib/utils/error')
const { sleep } = require('@ygkit/request')
const { deepClone, generateId, getCodeZipPath, uploadCodeToCos } = require('./utils')
const {
  invokeFaas,
  deployFaas,
  removeFaas,
  deployApigw,
  removeApigw,
  deployVpc,
  deployByDefaultVpc,
  removeVpc,
  deployCfs,
  removeCfs,
  deployDatabase,
  removeDatabase,
  deployLayer,
  removeLayer,
  deployCdn,
  removeCdn,
  getRequestStatus,
  asyncInvokeFaas
} = require('./utils/sdk')
const DEFAULT_CONFIGS = require('./config')
const moment = require('moment')

class ServerlessComponent extends Component {
  getCredentials() {
    const { tmpSecrets } = this.credentials.tencent

    if (!tmpSecrets || !tmpSecrets.TmpSecretId) {
      throw new ApiTypeError(
        'CREDENTIAL',
        'Cannot get secretId/Key, your account could be sub-account and does not have the access to use SLS_QcsRole, please make sure the role exists first, then visit https://cloud.tencent.com/document/product/1154/43006, follow the instructions to bind the role to your account.'
      )
    }

    return {
      SecretId: tmpSecrets.TmpSecretId,
      SecretKey: tmpSecrets.TmpSecretKey,
      Token: tmpSecrets.Token
    }
  }

  getAppId() {
    return this.credentials.tencent.tmpSecrets.appId
  }

  initialize() {
    this.CONFIGS = deepClone(DEFAULT_CONFIGS)
    this.framework = 'discuzq'
    this.__TmpCredentials = this.getCredentials()
  }

  async deploy(inputs) {
    this.initialize()

    let uuid = null
    if (!this.state.uuid) {
      uuid = generateId()
      this.state.uuid = uuid
    } else {
      ;({uuid} = this.state)
    }

    const { framework, CONFIGS, __TmpCredentials } = this
    const region = inputs.region || CONFIGS.region
    const zone = inputs.zone || CONFIGS.zone

    console.log(`Deploying ${framework} Application (${uuid})`)

    // 1. 部署VPC
    let deployVpcHandler = deployByDefaultVpc
    if (inputs.vpc) {
      inputs.vpc.vpcName = `${CONFIGS.vpc.vpcName}`
      inputs.vpc.subnetName = `${CONFIGS.vpc.subnetName}-${uuid}`
      deployVpcHandler = deployVpc
    } else {
      inputs.vpc = {}
      inputs.vpc.vpcName = `${CONFIGS.vpc.vpcName}-${uuid}`
      inputs.vpc.subnetName = `${CONFIGS.vpc.subnetName}-${uuid}`
    }
    const vpcOutput = await deployVpcHandler({
      instance: this,
      inputs,
      state: this.state.vpc
    })

    inputs.vpc = {
      vpcId: vpcOutput.vpcId,
      subnetId: vpcOutput.subnetId
    }

    inputs.zone = vpcOutput.zone

    this.state.vpc = vpcOutput

    // 2. 部署 cfs
    if (inputs.cfs) {
      inputs.cfs.fsName = `${CONFIGS.cfs.name}-${uuid}`
    } else {
      inputs.cfs = {}
      inputs.cfs.fsName = `${CONFIGS.cfs.name}-${uuid}`
    }
    const cfsOutput = await deployCfs({
        instance: this,
        inputs,
        state: this.state.cfs
      })
    this.state.cfs = cfsOutput
    console.log(`CfsInfo ${cfsOutput.cfsId}`)

    // 3. 部署 dzq-init 函数
    // dzq-init 函数需要配置 vpc，cfs
    let initFaasInputs = {}
    const defaultInitFaasInputs = {
      ...CONFIGS.dzqInitFaas,
      // 覆盖名称
      name: `${CONFIGS.dzqInitFaas.name}-${uuid}`,
    }
    if (inputs.faas) {
      initFaasInputs = {
        ...inputs.faas,
        ...defaultInitFaasInputs
      }
    } else {
      initFaasInputs = defaultInitFaasInputs
    }
    console.log(`CfsInfo ${cfsOutput.cfsId}`)
    const dzqInitOutput = await deployFaas({
      instance: this,
      inputs: {
        ...inputs,
        ...{
          faas: initFaasInputs
        },
        cfs: [
          {
            cfsId: cfsOutput.cfsId,
            mountInsId: cfsOutput.cfsId,
            localMountDir: CONFIGS.dzqInitFaas.cfsMountDir,
            remoteMountDir: '/'
          }
        ]
      },
      state: this.state.dzqInitFaas,
      code: {
        zipPath: CONFIGS.dzqInitFaas.zipPath,
        bucket: CONFIGS.bucket,
        object: `${CONFIGS.dzqInitFaas.name}-${uuid}.zip`
      }
    })

    this.state.dzqInitFaas = dzqInitOutput

    // 4. 上传 discuzq 代码到 COS
    const dzqCodeZip = await getCodeZipPath({ instance: this, inputs })
    const dzqCodes = await uploadCodeToCos({
      region,
      instance: this,
      code: {
        zipPath: dzqCodeZip,
        bucket: CONFIGS.bucket,
        object: `dzq-source-code-${uuid}.zip`,
        injectShim: true
      }
    })

    // 5. 调用 dzq-init 函数，同步函数代码
    console.log(`Start sync discuzq code`)
    const startTime = moment().local().add(8, 'h').format('YYYY-MM-DD HH:mm:ss')
    const invokeRes = await asyncInvokeFaas({
      instance: this,
      inputs,
      name: dzqInitOutput.name,
      namespace: dzqInitOutput.namespace,
      parameters: {
        DiscuzqCosRegion: region,
        DiscuzqCosBucket: dzqCodes.bucket,
        DiscuzqCosPath: dzqCodes.object,

        SecretId: __TmpCredentials.SecretId,
        SecretKey: __TmpCredentials.SecretKey,
        Token: __TmpCredentials.Token
      }
    })

    // 查询单个请求状态check复制代码是否成功
    // 考虑函数会出现运行错误重试场景，查询到全部执行失败才判断为最终失败
    let runFinished = false
    while (!runFinished) {
      let currentTime =  moment().local().add(8, 'h').format('YYYY-MM-DD HH:mm:ss')
      const invokeDetails = await getRequestStatus({
        instance: this,
        inputs,
        functionRequestId: invokeRes,
        name: dzqInitOutput.name,
        namespace: dzqInitOutput.namespace,
        startTime: startTime,
        endTime: currentTime
      })
      // console.log(invokeDetails)

      let invokeFailedNum = 0
      for (let i = 0; i < invokeDetails.TotalCount; ++i) {
        const requestStatus = invokeDetails.Data[i]
        if (requestStatus.RetCode === 1) {
          console.log(`sync discuzq code is running...`)
          break
        }

        if (requestStatus.RetCode === 0) {
          const retMsg = JSON.parse(requestStatus.RetMsg)
          if (retMsg.status !== 'success') {
            throw new ApiError({
              type: 'API_WORDPRESS_SYNC_FAAS_INVOKE_ERROR',
              message: `[INIT ERROR]: ${retMsg.reason}`
            })
          }
          console.log(`sync discuzq code success...`)
          runFinished = true
        }

        if (requestStatus.RetCode === -1) {
          invokeFailedNum = invokeFailedNum + 1
        }

        if (invokeFailedNum === invokeDetails.TotalCount) {
          throw new ApiError({
            type: 'API_WORDPRESS_SYNC_FAAS_INVOKE_ERROR',
            message: `[INIT ERROR]: invoke function error`
          })
        }
      }
      //等待5秒再次查询请求状态
      await sleep(5000)
    }

    // 6. 部署 layer
    const layerOutput = await deployLayer({
      instance: this,
      inputs: {
        ...inputs,
        ...{
          layer: {
            name: `${CONFIGS.layer.name}-${uuid}`
          }
        }
      },
      state: this.state.layer,
      code: {
        zipPath: CONFIGS.layer.zipPath,
        bucket: CONFIGS.bucket,
        object: `${CONFIGS.layer.name}-${uuid}.zip`
      }
    })

    // console.log('++++++++ layerOutput', layerOutput)

    this.state.layer = layerOutput

    // 7. 部署 dzq-server 函数
    // dzq-server 函数需要配置 vpc，cfs，环境变量
    let serverFaasInputs = {}
    const defaultServerFaasConfig = {
      ...CONFIGS.dzqServerFaas,
      // 覆盖函数名称
      name: `${CONFIGS.dzqServerFaas.name}-${uuid}`,
    }
    if (inputs.faas) {
      serverFaasInputs = {
        ...inputs.faas,
        ...defaultServerFaasConfig
      }
    } else {
      serverFaasInputs = defaultServerFaasConfig
    }
    const dzqServerOutput = await deployFaas({
      instance: this,
      inputs: {
        ...inputs,
        ...{
          faas: serverFaasInputs
        },
        // 添加 layer
        layers: [
          {
            name: layerOutput.name,
            version: layerOutput.version
          }
        ],
        // 添加 cfs
        cfs: [
          {
            cfsId: cfsOutput.cfsId,
            mountInsId: cfsOutput.cfsId,
            localMountDir: CONFIGS.dzqServerFaas.cfsMountDir,
            remoteMountDir: '/'
          }
        ]
      },
      state: this.state.dzqServerFaas,
      code: {
        zipPath: CONFIGS.dzqServerFaas.zipPath,
        bucket: CONFIGS.bucket,
        object: `${CONFIGS.dzqServerFaas.name}-${uuid}.zip`
      }
    })

    this.state.dzqServerFaas = dzqServerOutput

    // 8. 创建 API 网关
    if (inputs.apigw) {
      inputs.apigw.name = `${CONFIGS.apigw.name}_${uuid}`
      inputs.apigw.faas = {
        name: dzqServerOutput.name,
        namespace: dzqServerOutput.namespace,
        functionType: 'web'
      }
    } else {
      inputs.apigw = {}
      inputs.apigw.name = `${CONFIGS.apigw.name}_${uuid}`
      inputs.apigw.faas = {
        name: dzqServerOutput.name,
        namespace: dzqServerOutput.namespace,
        functionType: 'web'
      }
    }
    const apigwOutput = await deployApigw({
      instance: this,
      state: this.state.apigw,
      inputs
    })

    // console.log('++++++++ apigwOutput', apigwOutput)

    this.state.apigw = apigwOutput

    const outputs = {
      region,
      zone,
      vpc: vpcOutput,
      cfs: cfsOutput,
      apigw: apigwOutput,
      layer: layerOutput,
      dzqInitFaas: dzqInitOutput,
      dzqServerFaas: dzqServerOutput
    }

    if (inputs.cdn) {
      const cdnOutput = await deployCdn({
        instance: this,
        state: this.state.apigw,
        inputs,
        origin: apigwOutput.domain
      })

      console.log('cdnOutput', cdnOutput)
      this.state.cdn = cdnOutput

      outputs.cdn = cdnOutput
    }

    // 这里三个单独配置，是为了支持在线调试和实时日志
    this.state.region = region
    // 配置调试函数为 dzq-server，因为它是真正 discuzq 服务函数
    this.state.lambdaArn = dzqServerOutput.name
    this.state.namespace = dzqServerOutput.namespace

    await this.save()

    return outputs
  }

  async remove() {
    this.initialize()
    const { framework, state, CONFIGS } = this
    const { region } = state

    console.log(`Removing ${framework} App`)

    // 并行 删除 dzq-init 和 API 网关
    await Promise.all([
      removeFaas({ instance: this, region, state: state.dzqInitFaas }),
      removeApigw({ instance: this, region, state: state.apigw })
    ])

    // 删除 dzq-server 函数
    await removeFaas({ instance: this, region, state: state.dzqServerFaas })

    // 并行 删除 层、文件系统
    // 以上资源删除结束等待3s，以防后端异步逻辑未同步
    await sleep(3000)
    await Promise.all([
      removeLayer({ instance: this, region, state: state.layer }),
      removeCfs({ instance: this, region, state: state.cfs })
    ])

    // 删除 VPC
    // 由于以上资源均依赖 VPC，所以需要最后删除
    // 以上资源删除结束等待3s，以防后端异步逻辑未同步
    await sleep(3000)
    // 只有非默认 vpc 才执行删除
    if (this.state.vpc && !this.state.vpc.isDefault) {
      await removeVpc({ instance: this, region, state: state.vpc })
    }

    if (state.cdn) {
      await removeCdn({ instance: this, region, state: state.cdn })
    }

    this.state = {}

    return {}
  }
}

module.exports = ServerlessComponent
