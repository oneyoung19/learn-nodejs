1. `koa`
2. `koa-compose`
3. `koa-router`

## 1.启动服务

`node-koa`

```js
const Koa = require('koa')
const app = new Koa()
const port = 3000

app.use(async (ctx, next) => {
  if (ctx.path === '/' && ctx.method === 'GET') {
    ctx.body = 'Hello World'
  }
  await next()
})

app.listen(port, () => {
  console.log(`Example app running on http://127.0.0.1:${port}`)
})
```

## 2.路由分发

`node-koa-router`

```js
const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  // ctx.body = 'Home List'
  await ctx.render('home', { msg: 'Home List' })
})

// 自定义前缀
router.use('/home', router.routes())

// 必须调用注册router
app.use(router.routes())
```

## 3.静态资源托管

`node-koa-static`

```js
const static = require('koa-static')

// 相比express的静态托管 不支持自定义路径前缀
app.use(static(__dirname + '/public'))
```

## 4.模板引擎

`node-koa-views`

```js
const views = require('koa-views')

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
```

## 5.请求体处理

`node-koa-body`

```js
const bodyParser = require('koa-bodyparser')
app.use(bodyParser({
  // ctx.request.body
  enableTypes: ['json', 'form', 'text']
}))
```

## 6.请求体`formData`
## 7.`cookie` & `session`
## 8.自定义中间件

`node-koa-middleware`

```js
app.use(async (ctx, next) => {
  console.log(`Middleware before`)
  await next()
  console.log(`Middleware after`)
})
```

## 9.日志记录
## 10.错误处理
## 11.**文件上传**
## 12.跨域