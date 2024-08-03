/*
当作为初始输入传递给node时，或者被import语句或import()表达式引用时，Node.js 会将以下内容视为CommonJS ：

1. Files with a .cjs extension.

  扩展名为.cjs文件。

2. Files with a .js extension when the nearest parent package.json file contains a top-level field "type" with a value of "commonjs".
  当最近的父package.json文件包含值为"commonjs"的顶级字段"type"时，具有.js扩展名的文件。

3. Strings passed in as an argument to --eval or --print, or piped to node via STDIN, with the flag --input-type=commonjs.
  字符串作为参数传入--eval或--print ，或通过STDIN通过管道传输到node ，并带有标志--input-type=commonjs 。
*/
