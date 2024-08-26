import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: '/',
        component: () => import('../pages/Home.vue')
      },
      {
        name: 'About',
        path: '/about',
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
      }
    ]
  })
}
