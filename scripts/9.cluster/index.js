/*
[fork-nodejs-learning-guide](https://github.com/oneyoung19/fork-nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/cluster.md)
[解读 Node.js 的 cluster 模块](https://www.alloyteam.com/2015/08/nodejs-cluster-tutorial/)

EventEmitter {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  isWorker: false,
  isMaster: true,
  isPrimary: true,
  Worker: [Function: Worker],
  workers: {},
  settings: {},
  SCHED_NONE: 1,
  SCHED_RR: 2,
  schedulingPolicy: 2,
  setupPrimary: [Function (anonymous)],
  setupMaster: [Function (anonymous)],
  fork: [Function (anonymous)],
  disconnect: [Function (anonymous)],
  [Symbol(kCapture)]: false
}

*/
const cluster = require('cluster')
const os = require('os')
const http = require('node:http')

if (cluster.isMaster){
  let worker
  for (let i = 0, n = os.cpus().length; i < n; i += 1){
    worker = cluster.fork()
  }
  worker.send('hi there')
  // console.log(worker)
  console.log('os cpus', os.cpus().length)
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })
  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    // console.log('Starting a new worker')
    // cluster.fork()
  })
  worker.process.on('message', (msg) => {
    console.log('worker message', msg)
  })
} else {
  http.createServer(function(req, res) {
    res.writeHead(200)
    res.end(`response from worker ${process.pid}`)
  }).listen(8000)
  process.on('message', function(msg) {
    // process.send('process message', msg)
    process.send('process message')
  })
}
