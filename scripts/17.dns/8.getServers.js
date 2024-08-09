/*
dns.getServers() 是 Node.js dns 模块中的一个方法，用于返回当前 DNS 解析器正在使用的 DNS 服务器地址列表。

这些地址通常是从系统配置中读取的，但也可以通过 dns.setServers() 方法手动设置。

const servers = dns.getServers()

- 系统默认 DNS 服务器: 如果没有手动设置 DNS 服务器，dns.getServers() 将返回操作系统默认配置的 DNS 服务器地址。
- 手动设置: 如果你通过 dns.setServers() 方法手动设置了 DNS 服务器地址，dns.getServers() 将返回你手动设置的这些地址。

dns.getServers() 返回的服务器列表可以包括 IP 地址和可选的端口号（格式为 ip:port），如果没有端口号，默认使用 53 端口。
*/

const dns = require('dns')

// 获取当前正在使用的 DNS 服务器
const servers = dns.getServers()
console.log('DNS Servers:', servers)
