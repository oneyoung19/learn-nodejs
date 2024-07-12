/*
console.count([label])

对 `label` 变量进行计数，`label` 变量的默认值是 `default`。

console.countReset([label])

重置计数
*/

console.count()
// default: 1

console.count('default')
// default: 2

console.count('abc')
// abc: 1

console.count('xyz')
// xyz: 1

console.count('abc')
// abc: 2

console.count()
// default: 3

console.countReset()

console.count()
// default: 1
