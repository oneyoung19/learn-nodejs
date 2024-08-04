/*
https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require

如果未使用--experimental-require-module标志，则使用require()加载 ECMAScript 模块将引发ERR_REQUIRE_ESM错误，用户需要使用import()代替。

如果启用了--experimental-require-module ，并且require()加载的 ECMAScript 模块满足以下要求：

- 该模块是完全同步的（不包含顶级await ）；和
- 满足以下条件之一：
  1. 该文件的扩展名为.mjs 。
  2. 该文件具有.js扩展名，最接近的package.json包含"type": "module"
  3. 该文件具有.js扩展名，最接近的package.json不包含"type": "commonjs" ，并且启用了--experimental-detect-module 。

require()会将请求的模块作为 ES 模块加载，并返回模块命名空间对象。

在这种情况下，它与动态import()类似，但同步运行并直接返回名称空间对象。

为了与将 ES 模块转换为 CommonJS 的现有工具进行互操作，然后可以通过require()加载真正的 ES 模块，返回的命名空间将包含__esModule: true属性（如果它具有default导出），以便使用工具生成的代码可以识别真实 ES 模块中的默认导出。如果命名空间已经定义了__esModule ，则不会添加它。此属性是实验性的，将来可能会发生变化。它只能由遵循现有生态系统约定将 ES 模块转换为 CommonJS 模块的工具使用。直接在 CommonJS 中编写的代码应避免依赖它。

如果require()模块包含顶级await ，或者它import模块图包含顶级await ，则将抛出ERR_REQUIRE_ASYNC_MODULE 。在这种情况下，用户应该使用import()加载异步模块。

*/