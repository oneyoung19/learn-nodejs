import { createApp } from './app'
import vueServerRenderer from 'vue-server-renderer'
import fs from 'node:fs'
import path from 'node:path'

const renderer = vueServerRenderer.createRenderer({
  template: fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8')
})

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      renderer.renderToString(app, context, (err, html) => {
        if (err) {
          reject({ code: 500 })
        }
        resolve({
          code: 200,
          html
        })
      })
    }, reject)
  })
}
