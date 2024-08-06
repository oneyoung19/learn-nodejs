/*
http.clientRequest 是 Node.js 的 HTTP 模块中的一个类，代表一个 HTTP 请求对象。

它是由 http.request() 或 http.get() 方法创建的，并且用于向服务器发送 HTTP 请求。

http.clientRequest 对象具有许多方法和事件，用于控制和处理 HTTP 请求的生命周期。

常用的属性和方法：

1. write(chunk, [encoding], [callback]): 向请求主体写入数据。chunk 是你要发送的数据块。

2. end([data], [encoding], [callback]): 完成发送请求。当所有的请求数据都通过 write() 方法写入后，需要调用 end() 方法通知服务器请求已经完成。

3. abort(): 中止请求。如果请求已经发送但尚未完成，你可以使用这个方法取消请求。

4. setTimeout(timeout, [callback]): 设置请求的超时时间。timeout 是以毫秒为单位的时间，超过这个时间请求会自动终止。callback 是一个可选的回调函数，它将在超时时被调用。

5. on(event, listener): 用于监听请求过程中的事件。常见的事件包括：
  - 'response': 当服务器响应时触发，返回一个 http.IncomingMessage 对象。
  - 'error': 当请求发生错误时触发。
  - 'timeout': 当请求超时时触发

*/
const http = require('http')

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  method: 'GET'
}

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  
  res.setEncoding('utf8')
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`)
  })
  res.on('end', () => {
    console.log('No more data in response.')
  })
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
})

req.end()
