const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8')
})

const config = {
  title: 'Vue SSR',
  meta: '<meta name="description" content="Vue.js 服务端渲染"><meta name="keywords" content="Vue,SSR">'
}

const createApp = async (context) => {
  const { url } = context
  const app = new Vue({
    data: {
      url,
      num: 0
    },
    template: `<div>
    <p v-red>{{ url }}</p>
    <p v-show="num > 0">{{ num }}</p>
    <button @click="handleClick">Add num</button>
    </div>`,
    methods: {
      handleClick() {
        this.num++
      }
    },
    directives: {
      red: {
        inserted(el) {
          el.style.color = 'red'
        }
      }
    }
  })
  return await renderer.renderToString(app, {
    ...config,
    ...context
  })
}

module.exports = {
  createApp
}
