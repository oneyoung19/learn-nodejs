/*
测试可知，OutgoingMessage是ClientRequest ServerResponse的基类

1. IncomingMessage
2. OutgoingMessage
  - ClientRequest
  - ServerResponse
*/
const http = require('node:http')

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET'
}

// req => ClientRequest => OutgoingMessage
// res => IncomingMessage
const req = http.request(options, res => {
  // res.on('data', (chunk) => {
  //   console.log(`响应体: ${chunk}`)
  // })
  // res.on('end', () => {
  //   console.log('响应结束')
  // })
  console.log(res)
})

console.log(req)

req.end()
