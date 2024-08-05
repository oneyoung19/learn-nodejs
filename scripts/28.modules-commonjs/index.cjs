/*
当文件直接从 Node.js 运行时， require.main将设置为其module 。这意味着可以直接通过测试require.main === module来判断文件是否已经运行。

[require加载逻辑](https://nodejs.org/docs/latest/api/modules.html#all-together)

内置模块可以使用node:前缀来识别，在这种情况下它会绕过require缓存。
例如， require('node:http')将始终返回内置的 HTTP 模块，即使存在该名称的require.cache条目。

*/ 
console.log(require.main === module)

// 获取调用require()时将加载的确切文件名
console.log(require.resolve('vite'))

console.log(__dirname)

console.log(__filename)

// Module对象表示 Node.js 进程启动时加载的脚本
console.log(module)

const testResult = require('./4.module.cjs')

