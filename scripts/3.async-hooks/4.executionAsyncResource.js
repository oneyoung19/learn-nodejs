/*
触发时的异步资源
*/
const async_hooks = require('node:async_hooks')
const fs = require('node:fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}

log(async_hooks.executionAsyncResource())  // [object Object]

const timer = setTimeout(() => {
  log('timer', timer) // 2
  log(async_hooks.executionAsyncResource())  // 2
}, 0)

const path = '.'
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.executionAsyncResource())  // FSReqCallback { oncomplete: [Function (anonymous)] }
})
