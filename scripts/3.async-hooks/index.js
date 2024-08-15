const asyncHooks = require('async_hooks')
const fs = require('fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}

asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    log('Init: ', `${type}(asyncId=${asyncId}, parentAsyncId: ${triggerAsyncId})`)
  },
  before(asyncId) {
    log('Before: ', asyncId)
  },
  after(asyncId) {
    log('After: ', asyncId)
  },
  destroy(asyncId) {
    log('Destory: ', asyncId)
  }
}).enable()

setTimeout(() => {
  // after 生命周期在回调函数最前边
  log('Info', 'Async Before')
  Promise.resolve(3).then(o => log('Info', o))
  // after 生命周期在回调函数最后边
  log('Info', 'Async After')
})
//=> Output
// Init:  Timeout(asyncId=2, parentAsyncId: 1)
// Before:  2
// Info:  Async Before
// Init:  PROMISE(asyncId=3, parentAsyncId: 2)
// Init:  PROMISE(asyncId=4, parentAsyncId: 3)
// Info:  Async After
// After:  2
// Before:  4
// Info 3
// After:  4
// Destory:  2
