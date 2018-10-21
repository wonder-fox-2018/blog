import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  props: ['setUser'],
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/articles',
      components: {
        sidebar: () => import('./components/Sidebar.vue'),
        articles: () => import('./components/Articles.vue')
      },
      // children : [{
      //   path : ':id',
      //   name : 'articledetail',
      //   component : () => import('./views/articledetail.vue')
      // }]
    },
    {
      path: '/articles/:id',
      name: 'articledetail',
      component: () => import('./views/articledetail.vue')
    },
    {
      path: '/creator',
      name: 'creator',
      component: () => import('./views/Creator.vue')
    },
  ]
})