const { generateId, getServerlessSdk } = require('./lib/utils')

const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  component: 'discuz-q@dev',
  name: `discuzq-integration-tests-${generateId()}`,
  stage: 'dev',
  inputs: {}
}

const credentials = {
  tencent: {
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY,
  }
}

// get serverless construct sdk
const sdk = getServerlessSdk(instanceYaml.org)

it('Using template should deploy success', async () => {
  const instance = await sdk.deploy(instanceYaml, credentials)

  expect(instance).toBeDefined()

  const { outputs } = instance
  expect(instance.instanceName).toEqual(instanceYaml.name)

  // vpc
  expect(outputs.vpc).toBeDefined()
  expect(outputs.vpc.region).toBe('ap-shanghai')
  expect(outputs.vpc.zone).toBe('ap-shanghai-2')
  expect(outputs.vpc.vpcId).toContain('vpc-')
  expect(outputs.vpc.subnetId).toContain('subnet-')

  // cfs
  expect(outputs.cfs).toBeDefined()
  expect(outputs.cfs.cfsId).toContain('cfs-')

  // layer
  expect(outputs.layer).toBeDefined()
  expect(outputs.layer.name).toContain('dzq-layer')
  expect(outputs.layer.version).toBeGreaterThanOrEqual(1)
  expect(outputs.layer.runtimes).toEqual([
    'Php7'
  ])


  // apigw
  expect(outputs.apigw).toBeDefined()
  expect(outputs.apigw.id).toContain('service-')
  expect(outputs.apigw.environment).toEqual('release')

  // wpInitFaas
  expect(outputs.wpInitFaas).toBeDefined()
  expect(outputs.wpInitFaas.name).toContain('dzq-init')
  expect(outputs.wpInitFaas.runtime).toEqual('Nodejs12.16')

  // wpServerFaas
  expect(outputs.wpServerFaas).toBeDefined()
  expect(outputs.wpServerFaas.name).toContain('dzq-server')
  expect(outputs.wpServerFaas.runtime).toEqual('Php7')
  expect(outputs.wpServerFaas.layers).toEqual([
    {
      name: outputs.layer.name,
      version: outputs.layer.version
    }
  ])
})

it('should remove success', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(instanceYaml.org, instanceYaml.stage, instanceYaml.app, instanceYaml.name)

  expect(result.instance.instanceStatus).toEqual('inactive')
})
