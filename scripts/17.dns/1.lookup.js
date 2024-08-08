/*
dns.lookup 用于将主机名（通常是域名）解析为对应的 IP 地址。

dns.lookup(hostname, [options], callback)

  - hostname: 要解析的域名或主机名，类型为 string。
  - options: 可选的配置对象或数字，可以包含以下属性：
    - family: 数字，指定 IP 地址的类型，4 表示 IPv4，6 表示 IPv6。默认为 0，表示可以返回 IPv4 或 IPv6 地址，**具体取决于系统的 DNS 解析器**。
    - all: 布尔值，如果设置为 true，返回一个包含所有解析地址的数组。默认为 false。
    - hints: 数字，指定地址查找的选项，如 dns.ADDRCONFIG 或 dns.V4MAPPED。
    - verbatim: 布尔值，当设置为 true 时，以字面上的顺序返回记录。默认为 false，这意味着 dns.lookup() 将以最优顺序返回记录。
  - callback: 回调函数，形式为 function(err, address, family)，如果 all 设置为 true，则形式为 function(err, addresses)。


当 dns.lookup 方法的 all 选项设置为 true 时，它会返回主机名对应的所有 IP 地址。原因如下：

1. DNS 记录的多样性
域名系统（DNS）可以为一个域名配置多个 IP 地址。这些地址可能是为了负载均衡、故障转移或者是不同的服务部署在不同的服务器上。例如，一个大型网站可能有多个服务器处理请求，从而提供多个 IP 地址。这些地址可以是 IPv4 和 IPv6。

2. 负载均衡
为了提高网站的可靠性和性能，通常会将流量分配到多个服务器上。这意味着单个域名可以映射到多个 IP 地址，这些 IP 地址通常在 DNS 记录中被返回。

3. DNS 记录的类型
某些域名配置有多种类型的记录，如 A 记录和 AAAA 记录。A 记录用于返回 IPv4 地址，而 AAAA 记录用于返回 IPv6 地址。当 all 设置为 true，dns.lookup 会返回所有匹配的记录，包括不同类型的 IP 地址
*/
const dns = require('node:dns')

dns.lookup('www.baidu.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family)
})

dns.lookup('www.baidu.com', {all: true}, (err, addresses) => {
  console.log('addresses: %j', addresses)
})
