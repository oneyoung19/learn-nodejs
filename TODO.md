[nodejs-learning-guide](https://github.com/oneyoung19/fork-nodejs-learning-guide)

- [ ] `node` 服务添加 `traceId`
- [ ] `zipkin` 全链路追踪
- [x] `timers API` 以及 `Event Loop`
- [ ] `test runner API` 及 `mocha`、`jest` 等测试框架
- [x] `EventEmitter API`
- [x] `cluster` 集群
- [x] （如果集群存在，那么在负载均衡的情况下，如何同步登录信息？）
- [x] `PM2` 为什么也能执行 `python` 脚本？除此以外，还有哪些可执行脚本？
  `PM2` 的灵活性源于它并不依赖脚本语言本身，而是通过系统执行这些语言的解释器或运行时来启动和管理脚本。只需在 `PM2` 中指定正确的启动命令，`PM2` 就能管理这些进程。
- [x] `MVC` 逻辑
  首先 `Controller` 的含义，它是将输入按照一定逻辑转化为输出的过程，而 `Model` 则是处理业务逻辑，`View` 则是渲染页面。
  以 `egg` 服务为例，`View` 代表的是路由转发，`Controller` 则是转发的处理逻辑，而 `Model` 则是 `Controller` 中的数据操作（`Service` 或者数据库）。
- [x] SSG-vue

源码分析：

- [x] `express` 责任链模型
- [x] `koa` [洋葱模型](https://blog.xav1er.com/p/middleware-of-koa-and-express/)

第三方库（`express` 或 `koa`）的功能模块：

- [x] 1.启动服务
- [x] 2.路由分发
- [x] 3.静态资源托管
- [x] 4.模板引擎
- [x] 5.请求体处理
- [x] 6.请求体`formData`
- [x] 7.`cookie`
- [x] 8.`session`
- [x] 9.自定义中间件
- [x] 10.日志记录
- [x] 11.错误处理
- [x] 12.**文件上传**
- [x] 13.文件下载
- [x] 13.跨域

- [x] 1.`debug` ? `node inspect` 或者 `npm debug` 库（`koa-generator` 中）
- [x] 2.本地开发热更新
- [x] 3.PM2
- [x] 4.chalk
