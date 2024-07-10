const crypto = require('crypto')

const hash = crypto.createHash('sha256').update('hello world').digest('hex')

console.log(hash)
