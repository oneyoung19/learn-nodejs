/*

https.Agent 是 Node.js https 模块中的一个类，用于管理连接的持久性和性能。

https.Agent 的作用
  - 连接复用：通过复用现有的连接，Agent 可以减少创建新连接所需的开销，特别是在发送多个请求到同一个服务器时。
  - 连接池管理：Agent 会维护一个连接池，允许您控制最大并发连接数、空闲连接超时时间等参数。
  - 代理设置：您可以配置代理服务器，并通过 Agent 管理请求的代理行为。

https.Agent 的常见属性和方法
  1. new https.Agent([options]): 创建一个新的 Agent 实例。options 可以包含以下属性：

    - keepAlive: 是否启用连接保持活动状态（默认：false）。
    - keepAliveMsecs: 在启用 keepAlive 时，保持空闲连接的空闲时间（默认：1000 毫秒）。
    - maxSockets: 每个主机的最大并发连接数（默认：Infinity）。
    - maxFreeSockets: 最大空闲连接数（默认：256）。
  2. agent.destroy(): 销毁所有现有的套接字并阻止新的请求。

  3. agent.getName(options): 返回一个字符串，该字符串用于标识给定的连接参数，以便在连接池中查找或创建连接。
*/
const https = require('https')

// 创建一个 Agent 实例
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 10,
  maxFreeSockets: 5,
  keepAliveMsecs: 10000
})

// 使用 agent 发起请求
https.get('https://example.com', { agent: agent }, (res) => {
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
