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
因此，在 `Node.js` 的单线程模型中，**如果存在内存变量，多次读取不受影响，但要避免修改、删除等操作**。后者会导致数据污染或者丢失。

**如果确实要修改或者删除内存变量，那么就需要考虑使用 `CLS`**。
:::

## 3.CLS

## 4.链路追踪

