---
title: Event Loop
---

`Node.js` 中的**事件循环（Event Loop）**是其异步编程的核心机制。

它是 `Node.js` 在运行时用于处理非阻塞操作（比如 `I/O`、`定时器`、`Promise`、`事件监听`等）的机制，依赖于底层的 `libuv` 库来实现跨平台的事件驱动模型。

## 1.单线程机制

我们先利用 `koa` 框架来介绍下 `Nodejs` 中存在的线程阻塞问题。

### 1-1.同步阻塞

`readFileSync` 是同步阻塞的，它会阻塞主线程，导致无法处理其他请求。

```js
const fs = require('fs')

app.use(ctx => {
  const a = fs.readFileSync('a.txt', 'utf8')
  const b = fs.readFileSync('b.txt', 'utf8')
  const c = fs.readFileSync('c.txt', 'utf8')
  ctx.body = a + b + c
})

app.listen(3000)
```

:::tip
1. 当一个请求进来时，`Node.js` 会**在主线程里一步一步执行 `readFileSync`**；

2. 所有文件读完前，**主线程无法处理任何新请求**；

3. 并发请求会排队，性能严重下降。
:::

### 1-2.异步非阻塞

`readFile` 是异步非阻塞的，它会立即返回，不会阻塞主线程，可以处理其他请求。

```js
const Koa = require('koa')
const fs = require('fs/promises')  // 使用 Promise 版本的 fs
const app = new Koa()

app.use(async ctx => {
  const a = await fs.readFile('a.txt', 'utf8')
  const b = await fs.readFile('b.txt', 'utf8')
  const c = await fs.readFile('c.txt', 'utf8')

  ctx.body = a + b + c
})

app.listen(3000)
```

#### **第一步：客户端发起请求**

1. `Node.js` 主线程通过事件循环监听端口 `3000`；

2. 有一个请求来了（例如 `curl http://localhost:3000/`）；

3. 事件循环将这个请求的回调交给 `Koa` 处理（`app.use(...)` 函数被执行）。

#### **第二步：await fs.readFile('a.txt')**

1. `fs.readFile` 是异步操作，它**不会阻塞主线程**；

2. `Node.js` 会把读取 `a.txt` 的任务**交给 `libuv` 的线程池**去处理；

3. 主线程此时**挂起**这个 `await`，然后**继续事件循环，处理其他请求**；

> 如果此时有第二个客户端请求来了，它不会被“`a.txt` 还没读完”卡住，而是会**立刻被处理。**

#### **第三步：a.txt 读取完成，事件循环继续**

1. 当线程池读取完 `a.txt` 后，告诉事件循环：“回调可以执行了”；

2. 事件循环安排这个异步回调进入“微任务队列”或下一轮的事件阶段中；

3. 接着执行 `await fs.readFile('b.txt')`，这个过程再次是异步的，**线程池继续工作**；

4. 重复上述过程直到 `a`、`b`、`c` 都读完。

#### **第四步：所有文件读取完毕，发送响应**

1. `Koa` 收到所有结果后，将结果写入 `ctx.body`；

2. `Koa` 内部使用 `res.end()` 将响应发送回客户端；

3. 这一整套流程完成，事件循环等待下一次事件。

## 2. 事件循环的阶段

`Node.js` 的事件循环大致分为以下几个阶段（每个阶段是一个队列）：

```txt
┌───────────────────────┐
│ timers                │ ← setTimeout/setInterval 回调
├───────────────────────┤
│ pending callbacks     │
├───────────────────────┤
│ idle, prepare         │
├───────────────────────┤
│ poll                  │ ← 执行 I/O 回调（如 fs.readFile 回调）
├───────────────────────┤
│ check                 │ ← setImmediate 回调
├───────────────────────┤
│ close callbacks       │
└───────────────────────┘
```

### 2-1.timers

执行 `setTimeout()` 和 `setInterval()` 的回调。

### 2-2.pending callbacks

执行一些系统操作的回调（如 `TCP` 错误类型的回调）。

### 2-3.idle, prepare

内部使用，**用户代码不会直接接触**。

### 2-4.poll

等待 `I/O` 事件、处理 `I/O` 回调（例如：读取文件、网络请求等）。

### 2-5.check

执行 `setImmediate()` 的回调。

### 2-6.close callbacks

如 `socket.on('close', ...)`。

> 每次事件循环周期（`tick`）都会从头到尾执行以上这些阶段。

## 3. microtask（微任务）队列

在每个阶段之间，`Node.js` 会在主任务完成后立即清空所有的“微任务”（`microtasks`）队列：

包括：

- `process.nextTick()`（这是 `Node.js` 特有的，比 `Promise` 微任务还要快）
- `Promise.then/catch/finally`

执行顺序是：

- 当前阶段任务 →

- `process.nextTick()` 队列 →

- `Promise` 微任务队列 →

- 下一个阶段

:::tip
那么，结合**阶段**和**微任务**，我们就可以得到一个完整的 `Node.js` 事件循环的执行顺序：

```arduino
process.nextTick() > Promise 微任务 > timers（setTimeout） > setImmediate
```

1. 尽量不要在 `nextTick` 或 `Promise.then` 中嵌套太深，会阻塞 `I/O` 阶段，导致“饿死 `I/O`”；

2. `setImmediate` 更适合处理“下一轮事件循环”，而非立即执行；

3. `setTimeout(fn, 0)` 实际延迟时间不一定为 `0`，取决于系统和 `Node` 的处理。
:::

## 4. 测试代码

**以上的结论，跟 `node` 版本存在一定联系。**

我们此节的测试代码是基于 `node@22.14.0` 版本。

### 4-1.

```js
setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
})

Promise.resolve().then(() => {
  console.log('Promise')
})

process.nextTick(() => {
  console.log('nextTick')
})
```

打印结果：

```txt
nextTick
Promise
setTimeout
setImmediate
```

### 4-2.

```js
const fs = require('fs');

setTimeout(() => console.log('timeout1'), 0);
setImmediate(() => console.log('immediate1'));

fs.readFile('event-loop.js', () => {
  console.log('IO')
  setTimeout(() => console.log('timeout2'), 0);
  setImmediate(() => console.log('immediate2'));
});
```

打印结果：

```txt
timeout1
IO
immediate1
immediate2
timeout2
```

