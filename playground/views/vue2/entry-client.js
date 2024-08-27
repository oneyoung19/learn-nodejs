import Vue from 'vue'
import { createApp } from './app'

// const { app } = createApp()

// // 挂载到id为app的页面上
// app.$mount('#app')

const { app, router, store } = createApp()

router.onReady(() => {
  app.$mount('#app')
})

console.log('__INITIAL_STATE__', window.__INITIAL_STATE__)
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})
