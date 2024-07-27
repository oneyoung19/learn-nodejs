/*
"VM"指的是"Virtual Machine"模块。

这个模块提供了一个沙盒环境，允许你在其中执行JavaScript代码。

这对于创建隔离的执行环境、运行未受信任的代码或在同一应用程序中运行多个独立的JavaScript代码片段非常有用。

node:vm 模块支持在 V8 虚拟机上下文中编译和运行代码。

node:vm 模块不是安全机制。不要用它来运行不受信任的代码。

*/
const vm = require('node:vm')

const x = 1

const context = { x: 2 }
vm.createContext(context) // Contextify the object.

const code = 'x += 40; var y = 17;'
// `x` and `y` are global variables in the context.
// Initially, x has the value 2 because that is the value of context.x.
vm.runInContext(code, context)

console.log(context.x) // 42
console.log(context.y) // 17

console.log(x) // 1; y is not defined.
