# Node Vanilla

## 1.启动服务

`node-vanilla`

```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200 // 设置响应状态码
  res.setHeader('Content-Type', 'text/plain') // 设置响应头
  res.end('Hello, World!\n') // 响应内容
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

```

## 2.路由分发

`node-vanilla-router`

```js
const server = http.createServer((req, res) => {
  const url = req.url
  res.setHeader('Content-Type', 'text/plain')
  
  if (url === '/') {
    res.statusCode = 200
    res.end('This is the home page.\n')
  } else if (url === '/about') {
    res.statusCode = 200
    res.end('This is the about page.\n')
  } else {
    res.statusCode = 404
    res.end('Page not found.\n')
  }
})
```

## 3.静态资源托管

`node-vanilla-static`

```js
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found')
    } else {
      res.writeHead(200)
      res.end(content)
    }
  })
})
```

## 4.模板引擎

`node-vanilla-views`

```js
const renderTemplate = (filePath, data, callback) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      callback(err, null)
    } else {
      const rendered = ejs.render(content, data)
      callback(null, rendered)
    }
  })
}

http.createServer((req, res) => {
  const templatePath = path.join(__dirname, 'views', 'index.ejs')
  const data = { title: 'EJS Example', message: 'Hello, EJS!' }

  renderTemplate(templatePath, data, (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Error rendering template')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)
    }
  })
})
```

## 5.请求体处理

`node-vanilla-body`

```js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    const contentType = req.headers['content-type']

    if (contentType.startsWith('application/json')) {
      try {
        const parsedBody = JSON.parse(body)
        res.end('Received JSON data')
      } catch (e) {
        res.statusCode = 400
        res.end('Invalid JSON')
      }
    } else if (contentType.startsWith('application/x-www-form-urlencoded')) {
      const parsedBody = querystring.parse(body)
      res.end('Received URL-encoded data')
    } else {
      res.statusCode = 400
      res.end('Unsupported Content-Type')
    }
  })
})
```

## 6.FormData处理

`node-vanilla-body-formData`

```js
const http = require('http')
const multiparty = require('multiparty')

const server = http.createServer((req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    const contentType = req.headers['content-type']
    if (contentType.startsWith('multipart/form-data')) {
      const form = new multiparty.Form()
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.statusCode = 400
          res.end('Error parsing multipart data')
          return
        }
        res.end('Received multipart data')
      })
    } else {
      res.statusCode = 400
      res.end('Unsupported Content-Type')
    }
  })
})
```

## 7.`cookie` & `session`

`node-vanilla-cookie`

```js
const parseCookies = (cookieHeader) => {
  const cookies = {}
  if (!cookieHeader) return cookies
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=')
    cookies[name.trim()] = decodeURIComponent(rest.join('='))
  })
  return cookies
}

const server = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie)
  if (!cookies.username) {
    res.setHeader('Set-Cookie', 'username=JohnDoe; HttpOnly; Path=/; Max-Age=3600');
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Cookie has been set for the first time')
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`Welcome back, ${cookies.username}`)
  }
})
```

`node-vanilla-session`

```js
const http = require('http')
const crypto = require('crypto')

// 存储会话的对象（实际应用中应使用数据库或缓存，如 Redis）
const sessions = {}

const parseCookies = (cookieHeader) => {
  const cookies = {}
  if (!cookieHeader) return cookies
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=')
    cookies[name.trim()] = decodeURIComponent(rest.join('='))
  })
  return cookies
}

const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex')
}

const server = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie)
  let sessionId = cookies.sessionId

  if (!sessionId || !sessions[sessionId]) {
    sessionId = generateSessionId()
    sessions[sessionId] = { username: 'Guest' }
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/`)
  }

  const session = sessions[sessionId]
  if (req.url === '/login') {
    session.username = 'JohnDoe'
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('You are now logged in')
  } else if (req.url === '/logout') {
    delete sessions[sessionId] 
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('You are now logged out')
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(`Hello, ${session.username}`)
  }
})
```

## 8.自定义中间件

`node-vanilla-middleware`

```js
console.log(`There is no middleware in vanilla node.js`)
```

## 9.日志记录

`node-vanilla-logger`

```js
const logFilePath = path.join(__dirname, 'app.log')
const logLevels = {
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR'
}
const log = (level, message) => {
  const logMessage = `${new Date().toISOString()} [${logLevels[level]}] - ${message}\n`
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file', err)
    }
  })
}
const info = (message) => log('info', message)
const warn = (message) => log('warn', message)
const error = (message) => log('error', message)
```

## 10.错误处理

`node-vanilla-error`

```js
try {
  console.log('This is a message.')
} catch (error) {
  console.error(error)
}
```

## 11.**文件上传**

`node-vanilla-upload`

```js
const http = require('http')
const fs = require('fs')
const path = require('path')

const parseMultipartFormData = (req, boundary) => {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk.toString()
    })
    req.on('end', () => {
      const parts = data.split('--' + boundary).filter(part => part.trim() !== '--' && part.trim() !== '')
      const fileData = {}
      parts.forEach(part => {
        const [headers, body] = part.split('\r\n\r\n')
        if (headers.includes('filename')) {
          const nameMatch = headers.match(/name="(.+?)"/)
          const filenameMatch = headers.match(/filename="(.+?)"/)
          if (nameMatch && filenameMatch) {
            const name = nameMatch[1]
            const filename = filenameMatch[1]
            const fileContent = body.split('\r\n')[0]
            fileData[name] = { filename, fileContent }
          }
        }
      })
      resolve(fileData)
    })

    req.on('error', err => {
      reject(err)
    })
  })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')))
  } else if (req.method === 'POST' && req.url === '/upload') {
    const contentType = req.headers['content-type']
    const boundary = contentType.split('=')[1]
    try {
      const fileData = await parseMultipartFormData(req, boundary)
      for (let key in fileData) {
        const { filename, fileContent } = fileData[key]
        const savePath = path.join(__dirname, 'uploads', filename)
        fs.writeFileSync(savePath, fileContent, 'binary')
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('File uploaded successfully')
    } catch (error) {
      console.error('File upload error:', error)
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('File upload failed')
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})
```

## 12.文件下载

`node-vanilla-download`

```js
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/download')) {
    // 从请求中提取文件名（假设文件名是从 URL 参数中获取的）
    const fileName = req.url.split('/download/')[1]
    const filePath = path.join(__dirname, 'files', fileName)

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('File not found')
        return
      }
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`
      })

      const fileStream = fs.createReadStream(filePath)
      fileStream.pipe(res)

      fileStream.on('error', (streamErr) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Server error')
        console.error('File stream error:', streamErr)
      })
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})
```

## 13.跨域

`node-vanilla-cors`

```js
const http = require('http')

const server = http.createServer((req, res) => {
  // 设置 CORS 响应头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // 处理预检请求（OPTIONS 请求）
  if (req.method === 'OPTIONS') {
    res.writeHead(204) // No Content
    res.end()
    return
  }

  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, world')
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' }) // Method Not Allowed
    res.end('Method Not Allowed')
  }
})
```
