/*
创建一个TLS客户端
*/
const tls = require('tls')
const fs = require('fs')

const options = {
  host: 'localhost',
  port: 8000,
  ca: [fs.readFileSync('server-cert.pem')],
  // 可选的其他配置项
}

const client = tls.connect(options, () => {
  console.log('Client connected',
              client.authorized ? 'authorized' : 'unauthorized')
  process.stdin.pipe(client)
  process.stdin.resume()
})

client.setEncoding('utf8')
client.on('data', (data) => {
  console.log(data)
})
