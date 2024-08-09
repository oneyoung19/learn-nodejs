/*
dns.reverse 是 Node.js DNS 模块中的一个方法，用于执行反向 DNS 查询。

它将一个 IP 地址解析为关联的主机名列表。

反向 DNS 查询的典型用途是通过已知的 IP 地址查找域名。

dns.reverse(ip, callback)

- ip：一个字符串，表示要解析的 IP 地址。
- callback：回调函数，接收两个参数 (err, hostnames)：
  - err: 如果发生错误，将包含错误对象，否则为 null。
  - hostnames: 包含解析后主机名的数组。

*/
const dns = require('node:dns')

dns.reverse('8.8.8.8', (err, hostnames) => {
  if (err) {
    console.log(err.stack)
  }
  console.log('hostnames for 8.8.8.8: %j', hostnames)
})
