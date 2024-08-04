/*
在包的package.json文件中，两个字段可以定义包的入口点： "main"和"exports" 。

这两个字段都适用于 ES 模块和 CommonJS 模块入口点。

所有版本的 Node.js 都支持"main"字段，但其功能有限：它仅定义包的主入口点。

"exports"提供了"main"的现代替代方案，允许定义多个入口点、环境之间的条件入口解析支持，并**防止除"exports"中定义的入口点之外的任何其他入口点**。这种封装允许模块作者清楚地定义其包的公共接口。

对于针对当前支持的 Node.js 版本的新包，建议使用"exports"字段。对于支持 Node.js 10 及更低版本的包， "main"字段是必需的。

如果同时定义了"exports"和"main" ，则在受支持的 Node.js 版本中"exports"字段优先于"main" 。

{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/index": "./lib/index.js",
    "./lib/index.js": "./lib/index.js",
    "./feature": "./feature/index.js",
    "./feature/index": "./feature/index.js",
    "./feature/index.js": "./feature/index.js",
    "./package.json": "./package.json"
  }
}

*/

// const message = require('esm-a')
// console.log(message)

// const libMessage = require('esm-a/lib')
// console.log(libMessage)

import message from 'esm-a'
console.log(message)

import libMessage from 'esm-a/lib'
console.log(libMessage)
