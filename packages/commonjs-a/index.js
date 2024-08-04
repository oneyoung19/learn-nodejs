/*
imports 字段用于定义内部模块的导入映射。

它允许你为内部模块设置别名或映射路径，从而简化模块的导入。

**imports 字段的路径必须以 # 符号开头。**

*/
const libModule = require('#lib')

console.log(`CommonJS builtins:`, libModule)

module.exports = {
  message: 'CommonJS'
}
