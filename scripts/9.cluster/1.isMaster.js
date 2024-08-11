const cluster = require('node:cluster')

if (cluster.isMaster) {
  const worker = cluster.fork()
  worker.send('hi there')
} else if (cluster.isWorker) {
  process.on('message', function(msg) {
    process.send(msg)
  })
}
