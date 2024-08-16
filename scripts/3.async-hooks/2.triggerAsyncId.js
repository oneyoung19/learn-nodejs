const asyncHooks = require('node:async_hooks')
const fs = require('node:fs')
const net = require('node:net')
const port = 8080

asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    console.log(`${type}(asyncId=${asyncId}, parentAsyncId: ${triggerAsyncId})`)
  }
}).enable()

// setTimeout(() => {
//   // Promise.resolve(3).then(o => console.log(o))
//   // console.log(asyncHooks.triggerAsyncId())
//   fs.writeSync(1, 'Info: ' + asyncHooks.triggerAsyncId())
// })
const server = net.createServer((conn) => {
  // The resource that caused (or triggered) this callback to be called
  // was that of the new connection. Thus the return value of triggerAsyncId()
  // is the asyncId of "conn".
  fs.writeSync(1, 'Info: ' + asyncHooks.triggerAsyncId())

}).listen(port, () => {
  // Even though all callbacks passed to .listen() are wrapped in a nextTick()
  // the callback itself exists because the call to the server's .listen()
  // was made. So the return value would be the ID of the server.
  fs.writeSync(1, 'Info2: ' + asyncHooks.triggerAsyncId())
})