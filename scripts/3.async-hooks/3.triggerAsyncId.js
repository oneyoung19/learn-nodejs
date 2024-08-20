/*
父级的异步id
*/
const async_hooks = require('node:async_hooks')
const fs = require('node:fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}

log(async_hooks.triggerAsyncId())  // 0

const path = '.'
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.triggerAsyncId())  // 1
})
