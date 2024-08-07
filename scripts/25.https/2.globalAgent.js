/*
https.globalAgent 是 Node.js https 模块中的一个全局 Agent 实例，它用于处理所有没有显式指定 Agent 的 HTTPS 请求。

这意味着，当你在发起 HTTPS 请求时，如果没有为该请求提供一个自定义的 Agent 实例，Node.js 会自动使用 https.globalAgent 来管理连接。

如果想全局配置 HTTPS 连接的行为，比如启用 keepAlive 以保持连接的持久性，可以直接修改 https.globalAgent 的配置：

*/

const https = require('https')

// 配置 https.globalAgent
https.globalAgent.keepAlive = true
https.globalAgent.maxSockets = 100 // 限制最大并发连接数

// 发起请求，不指定 Agent，因此会使用 https.globalAgent
https.get('https://example.com', (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log(data)
  })
}).on('error', (err) => {
  console.error('Error: ' + err.message)
})
