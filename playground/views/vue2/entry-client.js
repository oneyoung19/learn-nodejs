import { createApp } from './app'

// const { app } = createApp()

// // 挂载到id为app的页面上
// app.$mount('#app')

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
