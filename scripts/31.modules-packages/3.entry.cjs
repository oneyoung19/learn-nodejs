/*
package.json中的main字段通常只能定义一个入口。

这样的话，往往只能使用require('module')，而是用require('module/lib/module.js')则会失败。

在这种场景下，可以在package.json中定义exports字段。

{
  "exports": {
    ".": "./index.js",
    "./lib/*": "./lib/*.js"
  }
}
*/

const message = require('commonjs-a')
console.log(message)

const libMessage = require('commonjs-a/lib')
console.log(libMessage)
