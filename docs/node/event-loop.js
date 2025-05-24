setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
})

Promise.resolve().then(() => {
  console.log('Promise')
})

process.nextTick(() => {
  console.log('nextTick')
})


// const fs = require('fs');

// setTimeout(() => console.log('timeout1'), 0);
// setImmediate(() => console.log('immediate1'));

// fs.readFile('event-loop.js', () => {
//   console.log('IO')
//   setTimeout(() => console.log('timeout2'), 0);
//   setImmediate(() => console.log('immediate2'));
// });