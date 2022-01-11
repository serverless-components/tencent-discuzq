const path = require('path')

function join(p) {
  return path.join(__dirname, p)
}

const CONFIGS = {
  region: 'ap-shanghai',
  zone: 'ap-shanghai-2',

  description: 'Created by Serverless Component',

  shimPath: path.join(__dirname, '_shims'),

  // 模版地址为discuzq官方安装包地址
  templateUrl:
    'https://dl.discuz.chat/dzq_latest_install.zip',

  bucket: 'discuzq-serverless-code',

  database: 'discuzq',

  // cdn 配置
  cdn: {
    autoRefresh: true,
    followRedirect: {
      switch: 'on'
    },
    forceRedirect: {
      switch: 'on',
      redirectType: 'https',
      redirectStatusCode: 301
    },
    https: {
      switch: 'on',
      http2: 'on'
    }
  },

  // vpc 配置
  vpc: {
    vpcName: 'dzq-vpc',
    subnetName: 'dzq-subnet',

    cidrBlock: '10.0.0.0/16',
    enableMulticast: 'FALSE',
    enableSubnetBroadcast: 'FALSE'
  },

  // cfs 配置
  cfs: {
    name: 'dzq-cfs',
    netInterface: 'VPC',
    storageType: 'SD',
    pGroupId: 'pgroupbasic',
    protocol: 'NFS'
  },

  // layer 配置
  layer: {
    zipPath: join('fixtures/layer/dzq-layer.zip'),
    name: 'dzq-layer',
    runtimes: ['Php7']
  },

  // dzq-init 函数配置
  dzqInitFaas: {
    zipPath: join('fixtures/faas/dzq-init.zip'),
    name: 'dzq-init',
    type: 'Event',
    runtime: 'Nodejs12.16',
    handler: 'sl_handler.handler',
    cfsMountDir: '/mnt',
    timeout: 600,
    memorySize: 1024,
    asyncRunEnable: true
  },

  // dzq-server 函数配置
  dzqServerFaas: {
    zipPath: join('fixtures/faas/dzq-server.zip'),
    name: 'dzq-server',
    type: 'web',
    runtime: 'Php7',
    cfsMountDir: '/mnt',
    wpCodeDir: '/mnt/discuzq',
    memorySize: 1024,
    timeout: 900
  },

  // 函数公共配置
  faas: {
    timeout: 10,
    memorySize: 128,
    namespace: 'default',
    runtime: 'Php7'
  },

  // API 网关配置
  apigw: {
    isDisabled: false,
    name: 'dzq_apigw',
    cors: true,
    timeout: 910,
    qualifier: '$DEFAULT',
    protocols: ['http','https'],
    environment: 'release'
  },

  // 数据库配置
  db: {
    projectId: 0,
    dbVersion: '5.7',
    dbType: 'MYSQL',
    port: 3306,
    cpu: 1,
    memory: 1,
    storageLimit: 1000,
    instanceCount: 1,
    payMode: 0,
    dbMode: 'SERVERLESS',
    minCpu: 0.25,
    maxCpu: 0.5,
    autoPause: 'yes',
    autoPauseDelay: 600 // default 1h
  },

  // COS 桶配置
  cos: {
    lifecycle: [
      {
        status: 'Enabled',
        id: 'deleteObject',
        filter: '',
        expiration: { days: '10' },
        abortIncompleteMultipartUpload: { daysAfterInitiation: '10' }
      }
    ]
  },

  cdn: {
    autoRefresh: true,
    forceRedirect: {
      switch: 'on',
      redirectType: 'https',
      redirectStatusCode: 301
    },
    https: {
      switch: 'on',
      http2: 'on'
    }
  }
}

module.exports = CONFIGS
