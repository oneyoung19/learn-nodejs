/*
console.assert(value[,...message])

*/

console.assert(true, 'does nothing')

console.assert(false, 'Whoops %s work', 'didn\'t')
// Assertion failed: Whoops didn't work

console.assert(false)

console.assert()
// Assertion failed
