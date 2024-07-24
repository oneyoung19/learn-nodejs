/*
生成签名，用于数据的完整性和真实性验证。
*/
const crypto = require('node:crypto')

async function signData(key, data) {
  const encoder = new TextEncoder()
  const dataArray = encoder.encode(data)
  const signature = await crypto.subtle.sign(
    {
      name: 'RSA-PSS',
      saltLength: 32,
    },
    key,
    dataArray
  )

  return signature
}

/*
验证签名，确保数据的完整性和真实性。
*/
async function verifySignature(key, data, signature) {
  const encoder = new TextEncoder()
  const dataArray = encoder.encode(data)
  const isValid = await crypto.subtle.verify(
    {
      name: 'RSA-PSS',
      saltLength: 32,
    },
    key,
    signature,
    dataArray
  )

  return isValid
}

