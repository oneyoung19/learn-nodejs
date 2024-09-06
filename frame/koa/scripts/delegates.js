// 对象委托/代理机制

var delegate = require('delegates')

const proto = module.exports = {}

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('length')
  .access('query')
  .access('search')
  .access('status')
  .access('method')
  .access('path')
  .access('body')
  .access('host')
  .access('url')
  .getter('subdomains')
  .getter('protocol')
  .getter('header')
  .getter('stale')
  .getter('fresh')
  .getter('secure')
  .getter('ips')
  .getter('ip')

console.log(proto)
