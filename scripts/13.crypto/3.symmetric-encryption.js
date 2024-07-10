const crypto = require('node:crypto')

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32) // 32字节密钥
const iv = crypto.randomBytes(16)  // 16字节初始化向量

// 加密
const cipher = crypto.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update('hello world', 'utf8', 'hex')
encrypted += cipher.final('hex')
console.log(encrypted)  // 输出加密后的数据

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, 'hex', 'utf8')
decrypted += decipher.final('utf8')
console.log(decrypted)  // 输出解密后的数据
