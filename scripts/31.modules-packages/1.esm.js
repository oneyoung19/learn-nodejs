/*
当作为初始输入传递给node时，或者被import语句或import()表达式引用时，Node.js 会将以下内容视为ES 模块：

1. Files with an .mjs extension.

  扩展名为.mjs文件。

2. Files with a .js extension when the nearest parent package.json file contains a top-level "type" field with a value of "module".

  当最近的父package.json文件包含值为"module"的顶级"type"字段时，具有.js扩展名的文件。

3. Strings passed in as an argument to --eval, or piped to node via STDIN, with the flag --input-type=module.

  字符串作为参数传入--eval ，或通过STDIN通过管道传输到node ，并带有标志--input-type=module 。

4. When using --experimental-detect-module, code containing syntax only successfully parsed as ES modules, such as import or export statements or import.meta, having no explicit marker of how it should be interpreted. Explicit markers are .mjs or .cjs extensions, package.json "type" fields with either "module" or "commonjs" values, or --input-type or --experimental-default-type flags. Dynamic import() expressions are supported in either CommonJS or ES modules and would not cause a file to be treated as an ES module.

  当使用--experimental-detect-module时，包含仅成功解析为ES 模块的语法的代码，例如import或export语句或import.meta ，没有明确标记应如何解释它。显式标记是.mjs或.cjs扩展名、带有"module"或"commonjs"值的package.json "type"字段，或者--input-type或--experimental-default-type标志。 CommonJS 或 ES 模块都支持动态import()表达式，并且不会导致文件被视为 ES 模块。

*/

/*
以.mjs结尾的文件始终作为ES 模块加载，无论最近的父package.json是什么。

**import能够导入CommonJS模块 但require不能导入ES模块。**

**CommonJS模块中，可以使用import懒加载加载esm模块。**

*/
