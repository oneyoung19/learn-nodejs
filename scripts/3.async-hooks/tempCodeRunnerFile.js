/*
触发时的异步id
*/
const async_hooks = require('node:async_hooks')
const fs = require('node:fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}

log(async_hooks.executionAsyncId())  // 1

const path = '.'
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.executionAsyncId())  // 5
})
