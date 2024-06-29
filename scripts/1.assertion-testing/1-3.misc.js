// Strict Mode
const assert = require('node:assert/strict')

// 1.Assert the input value is truthy. assert(value[,message]) 等同于 assert.ok(value[,message])
assert(1, 'value is not truthy')

// 2-1.浅度相等 assert.equal(actual, expected[,message])
assert.equal(1, 1)

// 2-2.浅度不相等 assert.notEqual(actual, expected[,message])
assert.notEqual(1, 2)

// 3-1.深度相等 assert.deepEqual(actual, expected[,message])
// assert.deepEqual([1, 2, [3]], [1, 2, ['3']])
assert.deepEqual({ a: { b: 1 } }, { a: { b: 1 } })

// 3-2.深度不相等 assert.notDeepEqual(actual, expected[,message])
assert.notDeepEqual({ a: { b: 1 } }, { a: { b: 2 } })

// 4-1.目标字符串匹配给定正则 assert.match(string, reg[,message])
assert.match('Hello World', /W/)

// 4-2.目标字符串不匹配给定正则 assert.doesNotMatch(string, reg[,message])
assert.doesNotMatch('Hello World', /w/)

// 5-1.目标异步函数拒绝 assert.rejects(asyncFn[,error][,message])
assert.rejects(new Promise((resolve, reject) => {
  reject('Reject')
}))

// 5-2.目标异步函数不拒绝 assert.doesNotReject(asyncFn[,error][,message])
assert.doesNotReject(Promise.resolve('Value'))

// 6-1.目标函数抛出错误
// assert.throws(() => {
//   throw new Error('error')
// }, {
//   name: 'TypeError',
//   message: 'Wrong value'
// })

// 6-2.目标函数不抛出错误 assert.doesNotThrow(fn[,error][,message])
// assert.doesNotThrow(() => {
//   throw new Error('error')
// })
assert.doesNotThrow(() => {
})

// 7.主动抛出错误 assert.fail([message])
// assert.fail('Fail Message')

// 8.检测目标值是否undefined或者null assert.ifError(value)
assert.ifError(null)


