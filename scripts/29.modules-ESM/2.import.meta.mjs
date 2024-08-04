/*

1. import.meta.url
当前文件的绝对路径

2. import.meta.resolve
获取模块的绝对路径（类似于path.resolve, 但该API依赖较高的node版本）
https://nodejs.org/docs/latest/api/esm.html#importmetaresolvespecifier

const dependencyAsset = import.meta.resolve('component-lib/asset.css');
// file:///app/node_modules/component-lib/asset.css
import.meta.resolve('./dep.js');
// file:///app/dep.js

在目前的版本中，如果要获取__dirname，可以使用：
const _dirname = path.dirname(url.fileURLToPath(import.meta.url))

*/
console.log(import.meta)

// __dirname is not defined in ES module scope
// import path from 'node:path'
// console.log(path.resolve(__dirname, './1.import.meta.mjs'))

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__dirname) // Logs the directory name of the current module

