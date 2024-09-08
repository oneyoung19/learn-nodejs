const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const cors = require('@koa/cors')

const app = new Koa()
const port = 3000

const router = new Router()
const homeRouter = require('./router')
const userRouter = require('./router/user')
const ajaxRouter = require('./router/ajax')
const fileRouter = require('./router/file')

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}))
app.use(bodyParser({
  // json/form/text/xml 不支持formData
  enableTypes: ['json', 'form', 'text']
}))
// app.use(async (ctx, next) => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   console.log('ctx.request', ctx.request)
//   ctx.body = ctx.request.body
//   await next()
// })

app.keys = ['some secret hurr']

// cookie中间件
app.use(async (ctx, next) => {
  console.log('ctx.cookies', ctx.cookies)
  // 设置签名的 cookie
  ctx.cookies.set('name', 'koa_signed', { signed: true })
  // 获取签名的 cookie
  // const cookie = ctx.cookies.get('name', { signed: true })
  // ctx.body = `Signed cookie set with value: ${cookie}`
  await next()
})
// session中间件
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}
app.use(session(CONFIG, app))
app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return

  let n = ctx.session.views || 0
  ctx.session.views = ++n
  ctx.body = n + ' views'
})
// 相比express的静态托管 不支持自定义路径前缀
app.use(static(__dirname + '/public'))
// Must be used before any router is used
app.use(views(__dirname + '/views', {
  // map: {
  //   html: 'underscore',
  // },
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  console.log(ctx)
  // console.log('Middleware before')
  await next()
  // console.log('Middleware after')
})

app.use(async (ctx, next) => {
  // 不使用koa-router的话 需要在此处手动判断path和method
  if (ctx.path === '/' && ctx.method === 'GET') {
    ctx.body = 'Hello World'
  }
  await next()
})
// 必须调用注册router
app.use(router.routes())
router.use('/home', homeRouter.routes())
router.use('/user', userRouter.routes())
router.use('/ajax', ajaxRouter.routes(), ajaxRouter.allowedMethods())
router.use('/file', fileRouter.routes())

router.get('/list', (ctx) => {
  console.log('logging list')
  ctx.body = 'Hello List'
})

// koa本身不支持路由
// app.get('/', (ctx) => {
//   ctx.body = 'Hello Koa'
//   return
// })
console.log('app', app)
app.listen(port, () => {
  console.log(`Example app running on http://127.0.0.1:${port}`)
})

/*
https://koajs.com/

Koa 是一个由 Express 的原始开发团队创建的下一代 Web 框架，专为 Node.js 应用程序设计。它的目标是提供一个更小巧、更具表现力和更强大的基础，用于编写 Web 应用程序和 API。Koa 和 Express 的主要区别在于其设计哲学和使用的技术。以下是 Koa 的一些主要特点：

- 基于 ES6 的 Generator 函数：Koa 最初使用了 ES6 的 Generator 函数来处理中间件，这使得中间件能够以同步的方式编写，避免了回调地狱问题。后来 Koa 也开始支持基于 async/await 的中间件，这使得异步操作更加直观。

- 无内置中间件：Koa 没有像 Express 那样内置一大堆中间件，如路由、视图引擎等。Koa 是一个非常轻量的框架，开发者需要自行选择和安装所需的中间件，这使得它更灵活。

- 更优雅的错误处理：由于 Koa 中间件链的设计，错误处理变得更加简单和一致，开发者可以使用 try/catch 来捕获错误。

- 洋葱模型的中间件结构：Koa 中间件是基于“洋葱模型”的，这意味着一个中间件在处理请求之前，可以在继续处理后续中间件之前进行一些操作。这种模式允许中间件在处理请求和响应时能够执行前置和后置逻辑。

- 更现代的代码风格：Koa 强调使用现代的 JavaScript 特性，比如 async/await，这使得代码更加简洁和易读。

Koa 非常适合需要高度定制的应用程序或 API，特别是那些希望使用现代 JavaScript 特性并且希望对中间件有更精细控制的项目。

由于其轻量和灵活的特点，Koa 被认为是一个更适合构建微服务或高性能 API 的框架。

总体来说，Koa 提供了更强的自由度和更现代的编程风格，但也需要对 Node.js 有更深的理解。
*/
