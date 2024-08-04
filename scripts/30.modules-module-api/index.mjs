/*
js文件中的全局module变量为：

Module {
  id: '.',
  path: '/Users/xxx/Desktop/learn-nodejs/scripts/30.modules-module-api',
  exports: {},
  filename: '/Users/xxx/Desktop/learn-nodejs/scripts/30.modules-module-api/index.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/xxx/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}

本节，我们总结node:module模块的[部分API](https://nodejs.org/docs/latest/api/module.html):

1. nodeModule.builtinModules 内置模块
2. nodeModule.createRequire
3. nodeModule.isBuiltin

*/
// console.log(module)

// 1.
// import nodeModule from 'node:module'
// console.log(nodeModule.builtinModules)

// 2.
// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
// console.log(import.meta.url)
// // sibling-module.js is a CommonJS module.
// const siblingModule = require('../31.modules-packages/3.entry.cjs')

// 3.
// import { isBuiltin } from 'node:module'
// console.log(isBuiltin('node:fs')) // true
// console.log(isBuiltin('fs')) // true
// console.log(isBuiltin('wss')) // false
