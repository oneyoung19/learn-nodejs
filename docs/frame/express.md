# Express

## 1.启动服务

`node-express`

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Got a GET request')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`)
})
```

## 2.路由分发

`node-express-router`

```js
const router = express.Router()

router.get('/list', (req, res) => {
  res.send('User List')
})

app.use('/user', router)
```

## 3.静态资源托管

`node-express-static`

```js
app.use('/static', express.static('public'))
```

## 4.模板引擎

`node-express-views`

```js
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
```

## 5.请求体处理

`node-express-body`

```js
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// application/json
app.use(express.json())
// text-plain
app.use(express.text())
// application/octet-stream
app.use(express.raw())
```

## 6.FormData处理

`node-express-body-formData`

```js
const multer = require('multer')
const upload = multer()
app.post('/form-data', upload.none(), (req, res) => {
  res.send(res.body)
})
```

## 7.`cookie` & `session`

`node-express-cookie`

```js
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// 设置 Cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', { maxAge: 900000, httpOnly: true })
  res.send('Cookie has been set')
})

// 获取 Cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username
  res.send(`Username from cookie: ${username}`)
})

// 清除 Cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username')
  res.send('Cookie has been cleared')
})
```

`node-express-session`

`session` 可以类比作 `vuex` 中带有 `id` 标识的全局 `store`。用来识别用户，并保持会话状态。

```js
const session = require('express-session')
app.use(session({
  name: 'express-session-cookie', // 设置 cookie 名称
  secret: 'your-secret-key',  // 用于加密 session ID 的密钥
  resave: false,  // 是否强制保存 session 即使未修改
  saveUninitialized: true  // 是否保存未初始化的 session
}))

// 设置 Session
app.get('/set-session', (req, res) => {
  req.session.username = 'JohnDoe'
  res.send('Session has been set')
})

// 获取 Session
app.get('/get-session', (req, res) => {
  const username = req.session.username
  res.send(`Username from session: ${username}`)
})

// 销毁 Session
app.get('/destroy-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error destroying session')
    }
    res.send('Session has been destroyed')
  })
})
```

## 8.自定义中间件

`node-express-middleware`

```js
app.use('/', (req, res, next) => {
  console.log(`Middleware before`)
  next()
  console.log(`Middleware after`)
})
```

## 9.日志记录

`node-express-logger`

```js
const morgan = require('morgan')
const fs = require('node:fs')
const path = require('node:path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
const errorLogStream = fs.createWriteStream(path.join(__dirname, 'logs/error.log'), { flags: 'a' })

// combined > common > short > dev >= short
app.use(morgan('combined', {
  stream: accessLogStream, // 指定日志的输出流。默认是 process.stdout（控制台输出）
  skip: (req, res) => res.statusCode >= 400, // 跳过特定条件下的日志记录
  immediate: false // 立即记录日志，通常日志是在响应发送后记录
}))
app.use(morgan('combined', {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 400,
  immediate: false
}))
```

## 10.错误处理

`node-express-error`

中间件捕获错误
区分状态码
代码执行错误（异步代码与同步代码 捕获的异同）
和日志工具的结合

```js
app.use('/', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
app.use((err, req, res, next) => {
  const { name, status, log = false } = err
  if (log) {
    const errorDetails = `
      Error Message: ${err.message}
      Status Code: ${err.status || 500}
      Stack Trace: ${err.stack}
      Request Method: ${req.method}
      Request URL: ${req.originalUrl}
      Request Headers: ${JSON.stringify(req.headers)}
    `
    errorLogStream && errorLogStream.write(errorDetails.replace(/ /g, '') + '\n', 'utf-8')
  }
  if (name === 'ValidationError') {
    return res.status(400).send({ error: name })
  }
  if (status === 404) {
    return res.status(404).send('Not Found')
  }
  res.status(500).send('Internal Server Error')
})
```

## 11.文件上传

`node-express-upload`

```js
const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const path = require('node:path')

const multer = require('multer')
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

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    console.log(req.file)
    res.send('File uploaded successfully!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
```

## 12.文件下载

`node-express-download`

```js
router.post('/download', (req, res) => {
  const { filename } = req.body
  const filePath = path.join(__dirname, '../uploads', filename)
  // download方法会在响应头中添加Content-Disposition头
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('File failed to download:', err)
      res.status(500).send('Error downloading file')
    }
  })
  // res.sendFile(filePath, (err) => {
  //   if (err) {
  //     console.error('File failed to send:', err)
  //     res.status(500).send('Error sending file')
  //   }
  // })
})
```

## 13.跨域

`node-express-cors`

```js
const cors = require('cors')
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}))
```
