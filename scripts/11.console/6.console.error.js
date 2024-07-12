/*
console.error([data][,...args])

打印 `stderr` 至控制台

其他形式：
console.warn()
*/

const code = 5
console.error('error #%d', code)
// Prints: error #5, to stderr

console.error('error', code)
// Prints: error 5, to stderr

// console.log(process.stderr.toString())
