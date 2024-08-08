/*
在Node.js 中，events 模块是用于处理和触发事件的核心模块之一。

它提供了一个基本的事件驱动机制，使得不同的部分可以通过事件相互通信。events 模块的核心是 EventEmitter 类，几乎所有的 Node.js 核心模块（如 HTTP、Stream、File System 等）都基于 EventEmitter 实现了事件驱动的模式。

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/20240808112402.png)

EventEmitter 类的常用方法
  - on(eventName, listener): 为指定的事件注册一个监听器。可以注册多个监听器。
  - emit(eventName, [...args]): 触发指定事件，并将可选的参数传递给监听器。
  - once(eventName, listener): 为指定事件注册一次性监听器，触发后自动移除。
  - off(eventName, listener) / removeListener(eventName, listener): 移除指定事件的监听器。
  - removeAllListeners([eventName]): 移除所有或指定事件的所有监听器。
  - listeners(eventName): 返回指定事件的监听器数组。
  - eventNames(): 返回当前注册的事件名数组。

许多 Node.js 内置模块都继承自 EventEmitter，例如：

  - http.Server: 处理 HTTP 请求的服务器。
  - stream.Readable / stream.Writable: 用于处理流的可读和可写数据。
  - net.Socket: 处理网络连接。
*/

const events = require('events')
console.dir(events)
// const eventEmitter = new events.EventEmitter()

// eventEmitter.on('my_event', () => {
//   console.log('data received successfully.')
// })

// eventEmitter.emit('my_event')
