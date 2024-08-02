/*
perf_hooks 是 Node.js 提供的一个模块，用于测量代码的性能。这个模块提供了一组工具，可以帮助开发者跟踪和分析应用程序的性能指标，如执行时间、内存使用情况等。

1. Performance 类:
  - performance.now(): 返回自Node.js进程启动以来经过的毫秒数，通常用于高精度时间测量。
  - performance.timeOrigin: 表示性能计时开始的时间点。

2. PerformanceObserver 类:
  - 允许观察性能条目并对其进行处理。它监听特定类型的性能条目，例如函数执行时间或 HTTP 请求的时间。

3. performance.mark() 和 performance.measure():
  - performance.mark(): 创建一个时间戳，可以用来标记代码中的特定点。
  - performance.measure(): 通过指定的标记点，测量两者之间的时间差。

4. performance.nodeTiming:
  - 提供与Node.js进程生命周期相关的时序信息，例如主模块加载时间、事件循环启动时间等。

5. performance.gc():
  - 提供关于垃圾回收的性能数据，允许开发者分析内存管理的效率。

*/
const { performance }  = require('node:perf_hooks')

const start = performance.now()
// 模拟一些耗时操作
for (let i = 0; i < 1e6; i++) {}
const end = performance.now()

console.log(`耗时 ${end - start} 毫秒`)
