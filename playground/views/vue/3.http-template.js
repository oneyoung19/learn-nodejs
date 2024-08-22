const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8')
})

const context = {
  title: 'Vue SSR',
  meta: '<meta name="description" content="Vue.js 服务端渲染"><meta name="keywords" content="Vue,SSR">'
}

const server = http.createServer((req, res) => {
  const { url } = req
  const app = new Vue({
    data: {
      url
    },
    template: `<div>{{ url }}</div>`
  })
  renderer.renderToString(app, context).then(html => {
    res.end(html)
  })
})

server.listen(8000, () => {
  console.log('server is running at http://localhost:8000')
})
