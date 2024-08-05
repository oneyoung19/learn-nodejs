/*
main starting
a starting
b starting
in b, a.done = %j', false
b done
in a, b.done = %j', true
a done
in main, a.done = %j, b.done = %j', true, true
*/

console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
