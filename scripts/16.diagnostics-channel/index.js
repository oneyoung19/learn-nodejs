/*
diagnostics_channel 是 Node.js 中的一个核心模块，提供了一种发布/订阅（publish/subscribe）机制，用于在应用程序和模块之间共享诊断信息。它可以帮助开发者监控和调试 Node.js 应用程序，特别是在涉及性能监控、日志记录和错误处理的场景中。

主要功能
  - 发布和订阅消息: 允许不同的模块或部分代码通过命名的通道发布和订阅消息。
  - 隔离: 通过命名的通道，信息可以有选择地发布和订阅，避免不相关的信息干扰。
  - 轻量级: 该模块设计简单且高效，不会显著影响性能。


*/

const diagnostics_channel = require('diagnostics_channel')

// 创建或获取一个通道
const channel = diagnostics_channel.channel('my-channel')

// 订阅通道
channel.subscribe((message, name) => {
  console.log(`Received message on ${name}:`, message)
})

// 发布消息到通道
channel.publish({ foo: 'bar' })
