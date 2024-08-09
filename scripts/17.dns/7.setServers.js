/*
dns.setServers() 是 Node.js dns 模块中的一个方法，用于手动设置 DNS 解析器使用的 DNS 服务器地址列表。

设置后，所有使用 dns 模块的 DNS 查询都会通过这些指定的服务器进行解析，而不是通过系统默认的 DNS 服务器。

dns.setServers(servers)

servers: 一个字符串数组，其中每个元素是一个 DNS 服务器的 IP 地址或 IP 地址和端口的组合。支持 IPv4 和 IPv6 地址格式。
  - IPv4 示例: "8.8.8.8"
  - IPv6 示例: "2001:4860:4860::8888"
  - IP 地址和端口号组合: "8.8.8.8:53" 或 "2001:4860:4860::8888:53"

*/

const dns = require('dns')

// 设置自定义的 DNS 服务器
dns.setServers(['8.8.8.8', '8.8.4.4'])

// 进行 DNS 查询
dns.lookup('example.com', (err, address, family) => {
  if (err) throw err
  console.log('Address:', address)
})

const servers = dns.getServers()
console.log('DNS Servers:', servers)
