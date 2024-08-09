/*

dns.lookup 用于将域名解析为 IP 地址。它类似于操作系统级别的 DNS 解析函数，通常会同时查找 A（IPv4）和 AAAA（IPv6）记录。
dns.resolve 用于查询特定类型的 DNS 记录，如 A、AAAA、MX、TXT 等。它是直接与 DNS 服务器通信进行查询。

1. dns.resolve(hostname[, rrtype], callback)
2. dns.resolve4(hostname, callback)
3. dns.resolve6(hostname, callback)
4. dns.resolveMx(hostname, callback)
5. dns.resolveTxt(hostname, callback)
6. dns.resolveSrv(hostname, callback)
7. dns.resolvePtr(hostname, callback)
8. dns.resolveNs(hostname, callback)
9. dns.resolveCname(hostname, callback)
10. dns.resolveSoa(hostname, callback)
11. dns.resolveNaptr(hostname, callback)

1. A (Address) 记录
描述: 将域名映射到一个 IPv4 地址。
用途: 当你输入一个域名时，DNS 解析器会查询 A 记录以获取该域名对应的 IPv4 地址。
示例: example.com -> 93.184.216.34

2. AAAA (IPv6 Address) 记录
描述: 将域名映射到一个 IPv6 地址。
用途: 当你输入一个域名时，DNS 解析器会查询 AAAA 记录以获取该域名对应的 IPv6 地址。
示例: example.com -> 2606:2800:220:1:248:1893:25c8:1946

3. MX (Mail Exchange) 记录
描述: 指定邮件服务器的域名，该服务器负责接收该域名的电子邮件。
用途: 用于电子邮件路由，指明哪台服务器接收特定域名的邮件。
示例: example.com -> mail1.example.com (优先级: 10), mail2.example.com (优先级: 20)

4. TXT (Text) 记录
描述: 存储任意文本数据，可以包括各种验证信息或说明。
用途: 通常用于域名所有权验证、SPF（发件人策略框架）等用途，确保邮件和服务的真实性。
示例: example.com -> "v=spf1 include:_spf.google.com ~all"

5. SRV (Service) 记录
描述: 指定特定服务的主机及端口号。
用途: 用于指定某些协议或服务的服务器位置，如 SIP、XMPP 等。
示例: _sip._tcp.example.com -> priority: 10, weight: 60, port: 5060, target: sipserver.example.com

6. PTR (Pointer) 记录
描述: 将 IP 地址映射到一个域名（反向 DNS 解析）。
用途: 用于反向查找 IP 地址的域名，通常用于验证邮件服务器的身份。
示例: 93.184.216.34 -> example.com

7. NS (Name Server) 记录
描述: 指定管理域名的 DNS 服务器。
用途: 确定哪些服务器负责处理特定域名的 DNS 查询。
示例: example.com -> ns1.example.com, ns2.example.com

8. CNAME (Canonical Name) 记录
描述: 将一个域名别名（alias）指向另一个域名。
用途: 用于将多个域名映射到同一个主机名，便于管理。
示例: www.example.com -> example.com

9. SOA (Start of Authority) 记录
描述: 包含有关 DNS 区域的管理信息。
用途: 包括 DNS 区域的原始服务器、管理员邮箱、序列号、刷新间隔、重试时间等。
示例: example.com -> primary_ns: ns1.example.com, contact: admin.example.com, serial: 2023080801

10. NAPTR (Name Authority Pointer) 记录
描述: 用于支持正则表达式替换的 DNS 记录，通常与 SRV 记录一起使用。
用途: 通常用于映射电话号码到 URI（如 SIP 协议）或其他服务。
示例: example.com -> order: 100, preference: 10, flags: "u", service: "E2U+sip", regexp: "!^.*$!sip:info@example.com!"

*/

const dns = require('node:dns')

dns.resolve('baidu.com', (err, address) => {
  console.log('resolve', address)
})

dns.resolve4('baidu.com', (err, address) => {
  console.log('resolve4', address)
})

dns.resolve6('www.baidu.com', (err, address) => {
  console.log('resolve6', address)
})

dns.resolveMx('baidu.com', (err, address) => {
  console.log('resolveMx', address)
})

dns.resolveTxt('baidu.com', (err, address) => {
  console.log('resolveTxt', address)
})

dns.resolveSrv('www.baidu.com', (err, address) => {
  console.log('resolveSrv', address)
})

dns.resolvePtr('baidu.com', (err, address) => {
  console.log('resolvePtr', address)
})

dns.resolveNs('baidu.com', (err, address) => {
  console.log('resolveNs', address)
})

dns.resolveCname('www.baidu.com', (err, address) => {
  console.log('resolveCname', address)
})

dns.resolveSoa('baidu.com', (err, address) => {
  console.log('resolveSoa', address)
})

dns.resolveNaptr('baidu.com', (err, address) => {
  console.log('resolveNaptr', address)
})
