const { parentPort } = require('node:worker_threads')

parentPort.on('message', (data) => {
  if (data.task === 'heavyComputation') {
    const result = heavyComputation()
    parentPort.postMessage(result)
  }
})

function heavyComputation() {
  let sum = 0
  for (let i = 0; i < 1e9; i++) {
    sum += i
  }
  return sum
}
