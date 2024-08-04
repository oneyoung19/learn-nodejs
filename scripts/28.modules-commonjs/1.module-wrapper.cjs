/*
在执行模块的代码之前，Node.js 将使用如下所示的函数包装器对其进行包装：

(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
})

通过这样做，Node.js 实现了一些目标：

1. 它将顶级变量（使用var 、 const或let定义）的作用域保留在模块而不是全局对象中。
2. 它有助于提供一些实际上是特定的全局变量 到模块，例如：
  - module和exports对象，实现者可以使用这些对象从模块导出值。
  - 方便变量__filename和__dirname ，包含模块的绝对文件名和目录路径。

*/
