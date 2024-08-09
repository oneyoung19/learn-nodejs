/*
dns.setDefaultResultOrder 是 Node.js dns 模块中的一个方法，用于设置 DNS 解析返回的地址列表的默认排序顺序。

它允许控制当使用 dns.lookup 方法进行域名解析时，返回的 IP 地址的顺序。

dns.setDefaultResultOrder(order)

order: 一个字符串，指定返回的 IP 地址顺序。可选值包括：
"ipv4first": 使 IPv4 地址优先于 IPv6 地址返回。
"verbatim": 按照 DNS 服务器返回的顺序保留地址。


*/

const dns = require('dns')

// 设置默认的结果顺序为 "ipv4first"
dns.setDefaultResultOrder('ipv4first')

// 解析 example.com
dns.lookup('example.com', (err, address, family) => {
  if (err) throw err
  console.log('Address: %j family: IPv%s', address, family)
})
