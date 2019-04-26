import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      component: () => import('@/pages/index')
    },
    {
      name: 'step',
      path: '/step/:step',
      component: () => import('@/pages/index')
    },
    {
      name: 'other',
      path: '*',
      redirect: {
        name: 'index'
      }
    }
  ]
})
