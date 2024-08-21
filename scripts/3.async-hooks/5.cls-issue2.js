const asyncHooks = require('node:async_hooks')
const session = new Map()
const fs = require('node:fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}
function timeout (id) {
  session.set('a', id)
  setTimeout(() => {
    log('timeout', asyncHooks.executionAsyncId())
    const a = session.get('a')
    console.log(a)
  })
}
 
timeout(1)
timeout(2)
timeout(3)
