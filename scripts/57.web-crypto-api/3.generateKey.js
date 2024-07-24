/*
生成一个加密密钥或密钥对
*/
const crypto = require('node:crypto')

async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-PSS',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['sign', 'verify']
  )
  return keyPair
}

generateKeyPair().then(keyPair => {
  console.log(keyPair)
})
