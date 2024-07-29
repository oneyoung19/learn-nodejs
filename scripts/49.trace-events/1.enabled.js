/*
在 Node.js 中，trace_events 模块用于生成和收集跟踪事件，帮助开发者调试和分析应用性能。

通过跟踪事件，开发者可以了解代码执行的路径、性能瓶颈以及资源消耗情况。

*/

/*
1.通过命令行启用：

node --trace-events-enabled

# is equivalent to

node --trace-event-categories v8,node,node.async_hooks
*/

/*
2.通过代码启用：
*/
const trace_events = require('trace_events')

const tracing = trace_events.createTracing({
  categories: ['node', 'fs', 'http']
})

tracing.enable()

// 运行一段时间后，禁用跟踪
setTimeout(() => {
  tracing.disable()
}, 10000)


