const fs = require('fs')
const COS = require('cos-nodejs-sdk-v5')
const shell = require('child_process')
const mysql = require('mysql2/promise')
const { sleep, unzip } = require('./utils')

async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false
  console.log(event)
  const bakPath = '/tmp/discuzq_bak'
  const unzipPath = '/tmp/discuzq/'
  const downloadZipPath = '/tmp/discuzq_bak/dzq.zip'
  const targetPath = '/mnt/discuzq'

  const response = {
    status: 'failed',
    reason: '',
    mountDir: unzipPath,
    syncDbRetryNumber: 0
  }

  // 同步代码
  // 创建 文件夹
  try {
    fs.mkdirSync(bakPath, { recursive: true })
    fs.mkdirSync(targetPath, { recursive: true })
  } catch (e) {}

  // 下载 discuzq 源码 zip 到指定目录
  async function downloadDzqCode() {
    return new Promise((resolve, reject) => {
      const cosConfig = {
        SecretId: event.SecretId,
        SecretKey: event.SecretKey
      }
      if (event.Token) {
        cosConfig.XCosSecurityToken = event.Token
      }
      const cos = new COS(cosConfig)

      cos.getObject(
        {
          Region: event.DiscuzqCosRegion,
          Bucket: event.DiscuzqCosBucket,
          Key: event.DiscuzqCosPath,
          Output: fs.createWriteStream(downloadZipPath)
        },
        function(err) {
          if (err) {
            reject(err)
          }
          resolve(true)
        }
      )
    })
  }

  try {
    console.log(`Sync discuzq code from COS`)
    await downloadDzqCode()
    fs.rmdirSync(unzipPath, { recursive: true })

    await unzip(downloadZipPath, unzipPath)

    const command = 'cp -rf ' + unzipPath + '* ' + targetPath
    shell.execSync(command);

    response.status = 'success'
    console.log(`Sync discuzq code success`)
  } catch (e) {
    console.log(`[Sync Code Error]: ${e.message}`)
    response.reason = `[Sync Code Error]: ${e.message}`
  }
  return response
}

module.exports.handler = handler
