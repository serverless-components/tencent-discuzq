## 部署 output 参数介绍

| 名称         | 类型                  | 描述                         |
| ------------ | --------------------- | ---------------------------- |
| vpc          | [Vpc](#Vpc)           | 私有网络相关配置             |
| cfs          | [Cfs](#Cfs)           | 文件存储相关配置             |
| apigw        | [Apigw](#Apigw)       | API 网关相关配置             |
| layer        | [Layer](#Layer)       | 层相关配置                   |
| wpInitFaas   | [Function](#Function) | 初始化云函数相关配置         |
| wpServerFaas | [Function](#Function) | Wordpress 服务云函数相关配置 |

### Vpc

私有网络

| 名称       |  类型  | 描述                  |
| ---------- | :----: | :-------------------- |
| region     | string | 地域                  |
| zone       | string | 分区                  |
| vpcId      | string | 私有网络 ID           |
| subnetId   | string | 私有网络子网 ID       |
| vpcName    | string | 私有网络名称          |
| subnetName | string | 子网名称              |
| mountIp    | string | 指定配置的私有网络 IP |

### Cfs

文件存储

| 名称        | 类型          | 描述             |
| ----------- | ------------- | ---------------- |
| name        | string        | 文件系统名称     |
| cfsId       | string        | 文件系统 ID      |
| region      | string        | 所属地域         |
| storageType | string        | 存储类型         |
| pGroupId    | string        | 权限组 ID        |
| protocol    | string        | 文件服务协议     |
| vpc         | [Vpc](#Vpc)   | 私有网络相关配置 |
| tags        | [Tag](#Tag)[] | 标签配置         |

### Tag

标签

| 名称  |  类型  | 描述   |
| ----- | :----: | :----- |
| key   | string | 标签键 |
| value | string | 标签值 |

### Apigw

API 网关

| 名称        |     类型      | 描述             |
| ----------- | :-----------: | :--------------- |
| url         |    string     | API 网关访问域名 |
| id          |    string     | API 网关服务 ID  |
| domain      |    string     | 域名             |
| environment |    string     | 环境             |
| apis        | [Api](#Api)[] | API 列表         |
| created     |    boolean    | 是否为 CLI 创建  |

#### Api

API 网关接口

| 名称            |  类型   | 描述                                                                      |
| --------------- | :-----: | :------------------------------------------------------------------------ |
| path            | string  | 请求路径                                                                  |
| method          | string  | 请求方法                                                                  |
| apiName         | string  | 接口名称                                                                  |
| apiId           | string  | 接口 ID                                                                   |
| authType        | string  | 鉴权类型                                                                  |
| businessType    | string  | 业务类型                                                                  |
| isBase64Encoded | boolean | 是否是 Base64 加密                                                        |
| internalDomain  | string  | 内网域名，主要是 Websocket 接口类型用到，比如 SCF 返回 WS 消息给 API 网关 |
| created         | boolean | 是否是 CLI 创建                                                           |

### Layer

层

| 名称        |   类型   | 描述                            |
| ----------- | :------: | :------------------------------ |
| bucket      |  string  | 部署层代码使用的 COS 桶名称     |
| object      |  string  | 部署层代码使用的 COS 桶文件名称 |
| description |  string  | 层描述                          |
| name        |  string  | 层名称                          |
| region      |  string  | 地域                            |
| runtimes    | string[] | 支持运行环境列表                |

### Function

云函数

| 名称      |       类型        | 描述       |
| --------- | :---------------: | :--------- |
| name      |      string       | 云函数名称 |
| runtime   |      string       | 运行环境   |
| namespace |      string       | 命名空间   |
| layers    | [Layer](#Layer)[] | 关联层列表 |
