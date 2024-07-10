const crypto = require('node:crypto')

// 生成密钥对
const { generateKeyPairSync } = crypto
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
})

// 公钥加密
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from('hello world'))
console.log(encryptedData.toString('hex'))  // 输出加密后的数据

// 私钥解密
const decryptedData = crypto.privateDecrypt(privateKey, encryptedData)
console.log(decryptedData.toString('utf8'))  // 输出解密后的数据
