/*
digest 信息摘要

计算数据的哈希值
*/
const crypto = require('node:crypto')

async function hashData(data) {
  const encoder = new TextEncoder()
  const dataArray = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataArray)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
  return hashHex
}

hashData('Hello, world!').then(console.log)
