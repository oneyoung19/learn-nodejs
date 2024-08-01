const querystring = require('node:querystring')

const stringified = querystring.stringify({ name: 'JohnDoe', age: 30 })

console.log(stringified) // 'name=JohnDoe&age=30'
