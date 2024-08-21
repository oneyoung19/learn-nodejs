const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const { globSync } = require('glob')

const staticPath = path.resolve(__dirname, '../static')

// const staticFiles = fs.readdirSync(staticPath, { recursive: true })
const staticFiles = globSync(['../static/**/*'])
console.log(staticFiles)

const server = http.createServer((req, res) => {
  const { url } = req
  const relativePath = url.slice(1)
  res.end('Vanilla')
})

server.listen(6801, () => {
  console.log('Server is running on http://127.0.0.1:6801')
})
