const { MIMEType } = require('node:util')

const myMIME = new MIMEType('text/plain')

console.dir(myMIME)
console.log(String(myMIME))
