/*
在 Node.js 的 DNS 模块中，Resolver 是一个类，用于执行自定义的 DNS 查询。

通过使用 Resolver，可以创建自己的 DNS 解析实例，而不是依赖于 Node.js 全局的 DNS 解析器。

这在需要使用特定的 DNS 服务器或者进行定制化 DNS 查询时非常有用。

Resolver 提供了一些常用的 DNS 查询方法，这些方法与 dns 模块中的全局方法类似，但它们只对该实例生效。

  - resolver.resolve(hostname, [rrtype], callback)：解析主机名到 IP 地址，rrtype 可以是 'A'、'AAAA'、'MX' 等记录类型。
  - resolver.reverse(ip, callback)：执行反向 DNS 查询，将 IP 地址解析为主机名。
  - resolver.getServers()：返回该解析器实例的 DNS 服务器列表。
  - resolver.setServers(servers)：设置该解析器实例使用的 DNS 服务器列表。

*/
const { Resolver } = require('dns')
const resolver = new Resolver()

// 设置自定义 DNS 服务器
resolver.setServers(['8.8.8.8', '8.8.4.4'])

// 使用自定义 DNS 服务器进行解析
resolver.resolve('www.example.com', (err, addresses) => {
  if (err) {
    console.log('Error:', err)
  } else {
    console.log('Addresses:', addresses)
  }
})

// 执行反向 DNS 查询
resolver.reverse('8.8.8.8', (err, hostnames) => {
  if (err) {
    console.log('Error:', err)
  } else {
    console.log('Hostnames:', hostnames)
  }
})
