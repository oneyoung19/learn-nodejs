---
title: Async Hooks
---

在 `Node.js` 中，`async_hooks` 是一个核心模块，它提供了一个 `API` 用于追踪 `Node.js` 应用中 **异步资源的生命周期**，比如 `Promise`、`setTimeout`、文件系统操作、网络请求等。

简单来说，它允许**监控和调试异步操作的执行流程**，是构建性能监控、调试工具、`CLS（Continuation Local Storage）`等功能的基础。

**主要用途**：

1. *开发环境下排查问题，即**跟踪异步资源的创建与销毁***

2. *异步上下文 `executionAsyncId`唯一，可**标记调试异步逻辑***

3. *实现链式本地存储（`CLS` 全称为`Continuation Local Storage`，即**持久化本地存储**）*

4. *构建请求上下文（如在 `HTTP` 请求中追踪用户 `ID`），即**链路追踪**。*

本章的相关代码，可以参考[learn-nodejs/3.async-hooks](https://github.com/oneyoung19/learn-nodejs/tree/main/scripts/3.async-hooks)

## 1.跟踪异步资源的创建与销毁

`asyncHooks` 可以用来配置节点，以跟踪异步资源的创建与销毁。

但要注意，**该节的调试推荐在开发环境调试使用，不推荐在生产环境下时使用，会影响性能**。

```js
const asyncHooks = require('async_hooks')
const fs = require('fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}
log(asyncHooks.executionAsyncId())

asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    log('Init: ', `${type}(asyncId=${asyncId}, parentAsyncId: ${triggerAsyncId}), resource: ${resource}`)
  },
  before(asyncId) {
    log('Before: ', asyncId)
  },
  after(asyncId) {
    log('After: ', asyncId)
  },
  destroy(asyncId) {
    log('Destory: ', asyncId)
  }
}).enable()

setTimeout(() => {
  // after 生命周期在回调函数最前边
  log('Info', 'Async Before')
  Promise.resolve(3).then(o => log('Info', o))
  // after 生命周期在回调函数最后边
  log('Info', 'Async After')
})
```

**打印结果如下**：

```txt
//=> Output
// Init:  Timeout(asyncId=2, parentAsyncId: 1)
// Before:  2
// Info:  Async Before
// Init:  PROMISE(asyncId=3, parentAsyncId: 2)
// Init:  PROMISE(asyncId=4, parentAsyncId: 3)
// Info:  Async After
// After:  2
// Before:  4
// Info 3
// After:  4
// Destory:  2
```

:::tip
注意：不能用 `console.log()` 打印日志，因为它本身也会触发异步操作，容易造成递归调用。

`console.log()` 实际上是往标准输出（`process.stdout`）写入内容，而 `process.stdout.write()` 在 **某些环境下（尤其是文件或管道输出时）是异步的**。

建议用 `fs.writeSync()`。
:::

## 2.标记调试异步逻辑

本节要分析，并说明以下两点：

1. `Node.js` 单线程模型**阻塞**，可能会导致**内存变量覆盖**、**数据丢失**。
2. `Node.js` 的异步上下文是唯一的，从而可以区别不同的异步逻辑。

### 2-1.简单例子

假设有如下代码：

```js
const asyncHooks = require('node:async_hooks')
const session = new Map()
const fs = require('node:fs')

function log(...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}
function timeout (id) {
  session.set('a', id)
  setTimeout(() => {
    log('timeout', asyncHooks.executionAsyncId())
    const a = session.get('a')
    console.log(a)
  })
}
 
timeout(1)
timeout(2)
timeout(3)
```

打印结果会是：

```txt
timeout 2
3
timeout 3
3
timeout 4
3
```

从这个例子中，可以看出：

1. `executionAsyncId` 会始终返回当前正在执行的异步上下文的唯一 `ID`。
2. 异步操作，如果覆盖了内存变量，会导致数据污染。

### 2-2.现实业务例子

本节，我们模拟一个实际业务场景。

首先，我们写一个 `sh` 文件，用来模拟客户端可能的请求：

```sh
#!/bin/bash

# 发送请求 A
curl http://127.0.0.1:3000/a &

# 等待 500 毫秒
sleep 0.5

# 发送请求 B
curl http://127.0.0.1:3000/b &

# 等待所有后台进程结束
wait
```

然后，我们写一个 `node` 服务，用来模拟服务端可能的处理逻辑：

并且假设 `/a` 请求的响应，要晚于 `/b` 请求的响应：

```js
const http = require('node:http')
const asyncHooks = require('node:async_hooks')
const session = new Map()

const server = http.createServer(async (req, res) => {
  console.log(req.url, asyncHooks.executionAsyncId())
  const { url } = req
  session.set('url', url)
  if (url === '/a') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
    res.end(session.get('url'))
    return
  }
  res.end(session.get('url'))
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
```

执行 `sh` 文件，会拿到如下响应：

```txt
/b/b
```

而 `http` 打印结果是：

```txt
/a 10
/b 16
```

这也完全验证了 `2-1` 节中的结果：

1. `executionAsyncId` 会始终返回当前正在执行的异步上下文的唯一 `ID`。
2. 异步操作，如果覆盖了内存变量，会导致数据污染。

:::tip
因此，在 `Node.js` 的单线程模型中，**如果存在内存变量，多次读取不受影响，但要避免修改、删除等操作**。后者可能会导致数据污染或者丢失。

**如果确实要修改或者删除内存变量，那么就需要考虑使用 `CLS`**。
:::

## 3.CLS

`CLS` 全称为 `Continuation Local Storage`，即**持续本地存储**。

它主要用来解决**在异步上下文中保存和获取一些“全局变量”**，比如请求上下文、用户信息、日志 `trace ID` 等。

### 3-1.CLS 的实现原理

首先，我们利用 `AsyncHooks` 来实现一个简单的 `CLS`：

```js
const async_hooks = require('async_hooks')
const { AsyncResource } = async_hooks

const contextMap = new Map()
const executionAsyncId = async_hooks.executionAsyncId

const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    // 核心原理：继承父级上下文！！！
    if (contextMap.has(triggerAsyncId)) {
      contextMap.set(asyncId, contextMap.get(triggerAsyncId))
    }
  },
  destroy(asyncId) {
    contextMap.delete(asyncId)
  }
})

hook.enable()

const cls = {
  run(fn, context) {
    const resource = new AsyncResource('CLS')
    resource.runInAsyncScope(() => {
      const id = executionAsyncId()
      contextMap.set(id, context)
      try {
        fn()
      } finally {
      }
    })
  },
  get(key) {
    const id = executionAsyncId()
    const context = contextMap.get(id)
    return context ? context[key] : undefined
  },
  // 核心原理：增加了命名空间！！！
  set(key, value) {
    const id = executionAsyncId()
    let context = contextMap.get(id)
    if (!context) {
      context = {}
      contextMap.set(id, context)
    }
    context[key] = value
  }
}

module.exports = cls
```

然后，我们可以这样在异步函数中获取和设置上下文数据：

```js
const cls = require('./cls')

const http = require('http')

http.createServer((req, res) => {
  cls.run(() => {
    cls.set('traceId', Math.random().toString(36).slice(2))

    setTimeout(() => {
      // 异步回调中还能取到 traceId 而不必担心此逻辑延时 其他异步逻辑覆盖
      console.log('traceId:', cls.get('traceId'))
      res.end('OK')
    }, 100)
  }, {})
}).listen(3000)
```

:::tip
`CLS` 的核心实现原理，**在于增加了一个 `asyncId` 的命名空间，并且将当前 `asyncId` 与父级 `triggerAsyncId` 按照异步上下文绑定起来**。
:::


### 3-2.AsyncLocalStorage

```js
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

http.createServer((req, res) => {
  asyncLocalStorage.run({ traceId: Date.now() }, () => {
    setTimeout(() => {
      const store = asyncLocalStorage.getStore()
      console.log('traceId:', store.traceId)
      res.end('OK')
    }, 100)
  })
}).listen(3000)
```

:::tip
最后，完整总结下 `CLS` 的必要性场景：

1. 如果**异步上下文是各自独立**的（也就是说，每个异步请求互不打扰、不操作同一块空间），那么不需要考虑 `CLS`。
2. 如果**异步上下文存在共享变量**（无论是全局变量，还是全局变量下的属性），那么需要考虑 `CLS`。
3. 如果**想要跨函数访问顶级异步上下文**，那么需要考虑 `CLS`（**这个特性，我们在下一节的链路追踪中分析**）。
4. 多线程、单线程延迟或者分布式部署、多进程部署，如果涉及到数据库，那么可以考虑**乐观锁**或者**悲观锁**。
:::

## 4.链路追踪

关于 `Node.js` 中的链路追踪，其实我们上一节的 `AsyncLocalStorage` 中已经把主要代码列出来了：

```js
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

http.createServer((req, res) => {
  asyncLocalStorage.run({ traceId: Date.now() }, () => {
    setTimeout(() => {
      const store = asyncLocalStorage.getStore()
      console.log('traceId:', store.traceId)
      res.end('OK')
    }, 100)
  })
}).listen(3000)
```

有同学可能会注意到，在效果实现上，下面的代码几乎是等价的，也不会有异步上下文变量的污染：

```js
http.createServer((req, res) => {
  const store = { traceId: Date.now() }
  setTimeout(() => {
    console.log('traceId:', store.traceId)
    res.end('OK')
  }, 100)
}).listen(3000)
```

但其实**上面这种写法依赖的是 `JavaScript` 的闭包特性，而不是一个独立的“上下文管理机制”。**

### 4-1.AsyncLocalStorage真正的意义

在实际业务中，链路追踪的 `traceId` 绝对是需要跨函数记录的，即一个请求进来，要利用 `traceId` 记录到每一个执行函数路径。

```js
const express = require('express')
const app = express()
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

app.use((req, res, next) => {
  asyncLocalStorage.run({ traceId: Date.now() }, () => {
    next()
  })
})

app.get('/', async (req, res) => {
  await doSomething()
  await doSomethingElse()
  const traceId = asyncLocalStorage.getStore()?.traceId
  console.log('traceId:', traceId)
  res.send('done')
})
```

在上面这个场景中：

1. 每一个 `HTTP` 请求都维护了自己的 `traceId`；
2. 无论是 `await` 多少个异步函数，都可以从 `asyncLocalStorage.getStore()` 获取当前“请求上下文”。

而这个功能，如果只是利用一个 `const traceId = Date.now()` 声明，那么函数就可能额外需要入参，这极大的耦合了代码逻辑。

因此，在本节我们再次额外总结下 `CLS` 的作用：

:::tip
1. **异步上下文操作独立，不共享操作空间**。
2. **跨中间件、跨模块、跨异步函数链保留上下文信息**，无需手动传参，解耦上下文管理。
:::

### 4-2.第三方库

在前文中，我们已经梳理了在 `Node.js` 中利用 `CLS` 链路追踪的实现原理。

为了方便，在实际项目中，我们也可以使用第三方库来实现 `CLS` 链路追踪：

1. [OpenTelemetry](https://github.com/open-telemetry)
2. [Open Zipkin](https://github.com/openzipkin)
3. [jaegertracing](https://github.com/jaegertracing)
