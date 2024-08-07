/*
https.get 是 Node.js 中用于发起 HTTPS GET 请求的简便方法。

它类似于 https.request，但专门用于发送 GET 请求，并且不需要手动调用 req.end() 来结束请求。
*/
const https = require('https')

// 请求选项
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/posts/1',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

// 发起请求
https.get(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log('Response:', data)
  })

}).on('error', (e) => {
  console.error('Request error:', e)
})
