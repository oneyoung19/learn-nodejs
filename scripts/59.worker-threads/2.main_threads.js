const path = require('path')

const { Worker } = require('node:worker_threads')

const worker = new Worker(path.resolve(__dirname, './3.worker_threads.js'))

worker.on('message', (result) => {
  console.log(`Main thread message: ${result}`)
  worker.terminate().then(() => {
    console.log('Main thread terminate')
  }).catch((err) => {
    console.error('Main thread failed to terminate', err);
  })
})

worker.on('error', (error) => {
  console.error(`Main thread error: ${error}`)
})

worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Main thread exit: ${code}`)
  }
})

worker.postMessage({ task: 'heavyComputation' })
