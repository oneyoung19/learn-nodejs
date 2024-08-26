const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const { globSync } = require('glob')
// const { getRouteTemplate } = require('../views/template/index')
// const { createApp } = require('../views/vue2/scripts/app')
// const { createApp } = require('../views/vue2/app')
// const renderer = require('vue-server-renderer').createRenderer({
//   template: fs.readFileSync(path.resolve(__dirname, '../views/vue2/public/index.html'), 'utf-8')
// })
const serverBundle = require(path.resolve(__dirname, '../views/vue2/dist/server/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../views/vue2/dist/client/vue-ssr-client-manifest.json'))
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../views/vue2/public/index.html'), 'utf-8'),
  clientManifest
})

const staticPath = path.resolve(__dirname, '../static')
const staticFiles = globSync(['playground/static/**/*'], { nodir: true }).map(path => path.replace(/^playground\/static/, ''))

const context = {
  title: 'Vue SSR',
  meta: '<meta name="description" content="Vue.js 服务端渲染"><meta name="keywords" content="Vue,SSR">'
}

const server = http.createServer(async (req, res) => {
  let { url } = req
  if (url === '/') {
    url = '/home'
  }
  if (staticFiles.includes(url)) {
    res.end(fs.readFileSync(path.resolve(staticPath, `.${url}`)))
    return
  }
  // const routeContent = getRouteTemplate(url.slice(1))
  // const app = createApp(req)
  const routeContent = await renderer.renderToString(req)
  if (routeContent) {
    res.end(routeContent)
    return
  }
  res.end('Vanilla')
})

server.listen(6801, () => {
  console.log('Server is running on http://127.0.0.1:6801')
})
