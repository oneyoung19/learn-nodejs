/*
module.createRequire 是 Node.js 中的一个方法，用于在 ES 模块（ECMAScript Modules，简称 ESM）环境中创建一个 CommonJS 样式的 require 函数。

这在需要在 ES 模块中加载 CommonJS 模块或 JSON 文件时特别有用。

主要用途：

1. 在 ES 模块中使用 CommonJS 模块:
ES 模块通常使用 import 语句来加载其他模块，但 import 不支持动态加载，也不支持直接加载 JSON 文件或某些类型的 CommonJS 模块。module.createRequire 允许你在 ES 模块中创建一个 require 函数，从而兼容加载这些模块。

2. 加载 JSON 文件:
ES 模块不支持直接通过 import 加载 JSON 文件（在早期版本中），但通过 module.createRequire 创建的 require 函数可以加载 JSON 文件。

3. 动态加载模块:
import 语句在 ES 模块中是静态的，而 require 可以在代码运行时动态决定加载哪个模块。module.createRequire 允许在需要动态加载模块的情况下使用 require。

应用场景：

1. 在 ES 模块中需要加载现有的 CommonJS 模块或第三方依赖时。
2. 动态加载模块或 JSON 文件时，import 语句无法满足需求。

*/

// 假设这是一个 ES 模块文件（使用 .mjs 扩展名或 "type": "module" 的 package.json）
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// 使用 require 加载 CommonJS 模块
const lodash = require('lodash')

// 加载 JSON 文件
const packageData = require('./package.json')

console.log(lodash)
console.log(packageData)
