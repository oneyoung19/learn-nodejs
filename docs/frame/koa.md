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

## 6.FormData处理

`node-koa-body-formData`

```js
const multer = require('@koa/multer')
const upload = multer()

app.post('/form-data', upload.none(), async (ctx, next) => {
  ctx.body = ctx.request.body
})
```

## 7.`cookie` & `session`

`node-koa-cookie`

```js
app.keys = ['some secret hurr']

// 中间件
app.use(async (ctx, next) => {
  ctx.cookies.set('name', 'koa_signed', { signed: true })
  await next()
})
```

`node-koa-session`

```js
const session = require('koa-session')

app.keys = ['some secret hurr']
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
```

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

`node-koa-upload`

```js
const Router = require('koa-router')
const router = new Router()
const fs = require('node:fs')
const path = require('node:path')

const multer = require('@koa/multer')
const uploadDirname = 'uploads'
const uploadDir = path.resolve(__dirname, uploadDirname)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log('file', ctx.request.file, ctx.file)
  try {
    ctx.body = 'File uploaded successfully!'
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
```

## 12.文件下载

`node-koa-download`

```js
router.post('/download', async (ctx) => {
  const { filename } = ctx.request.body
  const filePath = path.join(__dirname, 'uploads', filename)

  ctx.set('Content-Disposition', `attachment; filename=${filename}`)
  ctx.set('Content-Type', 'application/octet-stream')
  ctx.body = fs.createReadStream(filePath)
})
```

## 13.跨域
