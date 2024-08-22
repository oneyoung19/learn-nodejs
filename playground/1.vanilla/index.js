const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')
// const { getAllFilePaths } = require('../utils')

const { globSync } = require('glob')
const { getRouteTemplate } = require('../views/template/index')

const staticPath = path.resolve(__dirname, '../static')

// const staticGlob = `${staticPath}/**/*`
// const staticFiles = fs.readdirSync(staticPath, { recursive: true })
// const staticFiles = globSync([staticGlob], { nodir: true })
const staticFiles = globSync(['playground/static/**/*'], { nodir: true }).map(path => path.replace(/^playground\/static/, ''))
console.log(staticFiles)
// console.log(getAllFilePaths(staticPath))

const server = http.createServer((req, res) => {
  let { url } = req
  if (url === '/') {
    url = '/home'
  }
  if (staticFiles.includes(url)) {
    res.end(fs.readFileSync(path.resolve(staticPath, `.${url}`)))
    return
  }
  const routeContent = getRouteTemplate(url.slice(1))
  if (routeContent) {
    res.end(routeContent)
    return
  }
  res.end('Vanilla')
})

server.listen(6801, () => {
  console.log('Server is running on http://127.0.0.1:6801')
})
