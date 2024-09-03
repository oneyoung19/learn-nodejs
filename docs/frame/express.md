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

`node-express-view`

```js
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
```

## 5.请求体处理

## 6.自定义中间件

`node-express-middleware`

```js
app.use((req, res, next) => {
  console.log(`Middleware before`)
  next()
  console.log(`Middleware before`)
})
```

## 7.日志记录

## 8.错误处理

## 9.debug
