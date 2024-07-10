const crypto = require('node:crypto')

const hmac = crypto.createHmac('sha256', 'a secret key')
hmac.update('hello world')

const hmacValue = hmac.digest('hex')
console.log(hmacValue)  // 输出HMAC值
