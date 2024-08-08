/*
在 Node.js 中，dns.lookupService 是一个用于将 IP 地址和端口号解析为主机名和服务名的方法。

它是 DNS 模块的一部分，与 dns.lookup 不同，它的主要功能是反向 DNS 查询。

dns.lookupService(address, port, callback)

- address：一个字符串，表示要解析的 IP 地址。
- port：一个数字，表示与地址关联的端口号。
- callback：回调函数，接收三个参数 (err, hostname, service)：
  - err: 如果发生错误，将包含错误对象，否则为 null。
  - hostname: 解析后的主机名。
  - service: 解析后的服务名。


在 dns.lookupService 方法中，服务名（service）是与指定端口号相关联的网络服务的名称。

服务名通常基于互联网分配的端口号标准，即 “知名端口”。

这些服务名在许多操作系统和网络工具中都有标准化定义，常见的例子包括 http、https、ftp、ssh 等。

常见的服务名示例
  - http: 对应端口号 80，用于 Web 服务的超文本传输协议 (HTTP)。
  - https: 对应端口号 443，用于安全的 HTTP (HTTPS)。
  - ftp: 对应端口号 21，用于文件传输协议 (FTP)。
  - ssh: 对应端口号 22，用于安全外壳协议 (SSH)。
  - domain: 对应端口号 53，用于域名系统 (DNS)。
*/
const dns = require('dns')

dns.lookupService('8.8.8.8', 53, (err, hostname, service) => {
  if (err) {
    console.log('Error:', err)
  } else {
    console.log('Hostname:', hostname)
    console.log('Service:', service)
  }
})
