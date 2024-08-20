const asyncHooks = require('async_hooks')

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
