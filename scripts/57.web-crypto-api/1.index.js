/*
SubtleCrypto 是 Web Crypto API 中的一个接口，它提供了用于执行加密、解密、签名、验证、摘要生成、密钥生成和密钥导入导出等操作的方法。

这个接口设计用于执行那些可能需要较长时间才能完成的加密操作，因此大多数方法都是异步的，返回一个 Promise 对象。
*/

const crypto = require('node:crypto')

console.log(crypto.subtle)
