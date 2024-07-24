/*
使用指定的算法和密钥对数据进行加密。
*/
const crypto = require('node:crypto')

async function encryptData(key, data) {
  const encoder = new TextEncoder()
  const dataArray = encoder.encode(data)
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    dataArray
  )

  return { iv, encryptedData }
}

/*
使用指定的算法和密钥对数据进行解密。
*/
async function decryptData(key, iv, encryptedData) {
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encryptedData
  )

  const decoder = new TextDecoder()
  return decoder.decode(decryptedData)
}

