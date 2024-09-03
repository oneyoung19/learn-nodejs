const path = require('node:path')
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000

const homeRouter = require('./router')
const userRouter = require('./router/user')
const ajaxRouter = require('./router/ajax')
const sessionRouter = require('./router/session')

app.use(session({
  name: 'express-session-cookie',
  secret: 'your-secret-key',  // 用于加密 session ID 的密钥
  resave: false,  // 是否强制保存 session 即使未修改
  saveUninitialized: true  // 是否保存未初始化的 session
}))

// GET请求 req.query
// POST请求 urlencoded FormData JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(express.raw())

// 静态资源托管
app.use('/static', express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  console.log('logging before')
  next()
  console.log('logging after')
})

app.use('/user', (req, res, next) => {
  console.log('Middleware user')
  next()
})

app.use((req, res, next) => {
  console.log('Ding')
  next()
})

// 注意此处中间件 放置在上面use中间件之后，那么上述中间件才会在此处路由下执行
app.use('/', homeRouter)
app.use('/user', userRouter)
app.use('/ajax', ajaxRouter)
app.use('/session', sessionRouter)

app.get('/', (req, res) => {
  res.send('Got a GET request')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app running on http://127.0.0.1:${port}`)
})

/*
https://expressjs.com/

Express 是一个基于 Node.js 的轻量级、灵活的 Web 应用程序框架，用于构建 Web 应用程序和 API。它简化了使用 Node.js 创建服务器的过程，提供了一组强大的功能来处理 HTTP 请求、路由、视图渲染以及中间件支持。以下是 Express 的一些主要特点：

- 路由：Express 提供了简洁的路由机制，允许开发者根据不同的 URL 路径和 HTTP 方法（如 GET、POST、PUT、DELETE 等）来定义处理逻辑。

- 中间件：中间件是 Express 的核心概念之一，它是一个函数，可以在请求被路由到最终处理程序之前对请求对象进行操作。中间件用于处理请求数据、验证用户身份、记录日志等。

- 视图引擎：Express 支持集成多种视图引擎，如 Pug、EJS 等，用于渲染动态 HTML 页面。

- 静态文件服务：Express 可以方便地提供静态文件（如图片、CSS、JavaScript 文件）的服务。

- 支持 RESTful API：Express 通过其灵活的路由和中间件支持，能够轻松创建 RESTful API。

- 社区和生态系统：Express 是最受欢迎的 Node.js 框架之一，拥有大量的第三方中间件和插件，可以扩展其功能。

使用 Express，可以更快速地搭建和管理 Web 服务器，并专注于业务逻辑的实现，而不必处理底层的复杂性。

*/
