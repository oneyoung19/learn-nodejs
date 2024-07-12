/*
console.time([label])

console.timeLog([label][,...data])

console.timeEnd([label])
*/

console.time('process')

const value = 42
console.timeLog('process', value)
// Prints "process: 365.227ms 42".

console.timeEnd('process')
