const trace_events = require('trace_events')

// 创建一个 Tracing 对象，跟踪 node 和 http 事件
const tracing = trace_events.createTracing({ categories: ['node', 'http'] })

// 启用跟踪
tracing.enable()

const http = require('http')
const server = http.createServer((req, res) => {
  res.end('Hello, world!')
})

server.listen(3030, () => {
  console.log('Server is listening on port 3030')

  // 模拟一些请求
  http.get('http://localhost:3030', (res) => {
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
  })
})

// 一段时间后禁用跟踪
setTimeout(() => {
  tracing.disable()
  console.log('Tracing disabled')
}, 3000)
