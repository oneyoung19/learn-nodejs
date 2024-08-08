/*
Node.js 的 dns 模块提供了域名系统（DNS）的接口，用于执行 DNS 查询。

它可以用于解析域名、查询 DNS 记录类型等操作。

主要功能
  - 解析域名：将域名解析为 IP 地址。
  - 查询 DNS 记录：可以查询特定类型的 DNS 记录，如 A、AAAA、MX、TXT 等。
  - 反向解析：将 IP 地址反向解析为域名。

{
  lookup: [Function: lookup],
  lookupService: [Function: lookupService],
  Resolver: [class Resolver extends ResolverBase],
  setDefaultResultOrder: [Function: setDefaultResultOrder],
  setServers: [Function: defaultResolverSetServers],
  ADDRCONFIG: 1024,
  ALL: 256,
  V4MAPPED: 2048,
  NODATA: 'ENODATA',
  FORMERR: 'EFORMERR',
  SERVFAIL: 'ESERVFAIL',
  NOTFOUND: 'ENOTFOUND',
  NOTIMP: 'ENOTIMP',
  REFUSED: 'EREFUSED',
  BADQUERY: 'EBADQUERY',
  BADNAME: 'EBADNAME',
  BADFAMILY: 'EBADFAMILY',
  BADRESP: 'EBADRESP',
  CONNREFUSED: 'ECONNREFUSED',
  TIMEOUT: 'ETIMEOUT',
  EOF: 'EOF',
  FILE: 'EFILE',
  NOMEM: 'ENOMEM',
  DESTRUCTION: 'EDESTRUCTION',
  BADSTR: 'EBADSTR',
  BADFLAGS: 'EBADFLAGS',
  NONAME: 'ENONAME',
  BADHINTS: 'EBADHINTS',
  NOTINITIALIZED: 'ENOTINITIALIZED',
  LOADIPHLPAPI: 'ELOADIPHLPAPI',
  ADDRGETNETWORKPARAMS: 'EADDRGETNETWORKPARAMS',
  CANCELLED: 'ECANCELLED',
  getServers: [Function: bound getServers],
  resolve: [Function: bound resolve],
  resolve4: [Function: bound queryA],
  resolve6: [Function: bound queryAaaa],
  resolveAny: [Function: bound queryAny],
  resolveCaa: [Function: bound queryCaa],
  resolveCname: [Function: bound queryCname],
  resolveMx: [Function: bound queryMx],
  resolveNaptr: [Function: bound queryNaptr],
  resolveNs: [Function: bound queryNs],
  resolvePtr: [Function: bound queryPtr],
  resolveSoa: [Function: bound querySoa],
  resolveSrv: [Function: bound querySrv],
  resolveTxt: [Function: bound queryTxt],
  reverse: [Function: bound getHostByAddr],
  promises: [Getter]
}
*/
const dns = require('node:dns')
console.log(dns)

dns.lookup('www.baidu.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family)
})

dns.lookup('www.baidu.com', {all: true}, (err, addresses) => {
  console.log('addresses: %j', addresses)
  addresses.forEach((address) => {
    dns.reverse(address.address, (err, hostnames) => {
      console.log('reverse for %j: %j', address.address, hostnames)
    })
  })
})
