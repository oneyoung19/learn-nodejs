/*
CLS 全称为 Continuation-local storage，即持久化本地存储。

如下例中的同一个全局session，如果/a和/b两次请求存在时间差，那么第二次请求的 session 值会覆盖第一次请求的 session 值。

但实际上，我们想要/a请求中获取到的是/a，而/b请求中获取到的是/b。
*/

const http = require('node:http')
const session = new Map()
const server = http.createServer(async (req, res) => {
  console.log(req.url)
  const { url } = req
  session.set('url', url)
  if (url === '/a') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
    res.end(session.get('url'))
    return
  }
  res.end(session.get('url'))
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
