/*
在Node.js中，v8模块是一个提供与V8引擎交互接口的内置模块。

V8引擎是Google开发的一个开源JavaScript引擎，用于Chrome浏览器和Node.js。

通过v8模块，开发者可以访问V8引擎的一些底层特性，获取和设置V8的内部统计数据和参数。

以下是v8模块的一些主要功能和方法：

1. 内存统计：获取V8引擎的内存使用情况，包括堆内存的详细统计数据。
2. 堆快照：生成堆快照，帮助调试和分析内存泄漏等问题。
3. 堆空间统计：获取V8引擎中不同堆空间的使用情况。

*/

const v8 = require('v8')

const heapStats = v8.getHeapStatistics()
console.log(heapStats)

v8.writeHeapSnapshot()
console.log('Heap snapshot saved.');
