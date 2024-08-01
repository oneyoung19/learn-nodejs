/*
1. The querystring.encode() function is an alias for querystring.stringify().

2. The querystring.decode() function is an alias for querystring.parse().
*/
const querystring = require('node:querystring')

const obj = {
  name: 'zhangsan',
  age: 18
}

const result1 = querystring.encode(obj)

console.log(result1)

const result2 = querystring.decode(result1)

console.log(result2)
