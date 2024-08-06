/*
在 Node.js 中，inspector 是一个内置模块，用于与 V8 JavaScript 引擎的调试协议进行交互。

通过 inspector 模块，你可以启动一个调试会话，获取和设置断点，检查和修改变量的值，甚至执行代码片段。

inspector 模块提供了一个高级的 API，可以直接在代码中使用，也可以通过 --inspect 标志在命令行启动 Node.js 应用程序时自动启动一个调试会话。

1. node --inspect index.js
2. node --inspect-brk index.js 立即触发断点

打开chrome://inspect
*/

// const inspector = require('node:inspector')
// inspector.open(9230, 'localhost', true)

console.log('inspector')

console.log('inspector1')
