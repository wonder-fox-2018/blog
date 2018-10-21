import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue'),
      children: [{
        path: '/blog/article/:id',
        name: 'article',
        component: () => import('./components/ArticleDetail.vue')
      }]
    },
    {
      path: '/personal',
      name: 'personal',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        }
      },
      component: () => import('./views/Personal.vue'),
      children: [{
        path: '/personal/article/:id',
        name: 'read',
        component: () => import('./components/ArticleDetail.vue')
      },
      {
        path: '/personal/article/edit/:id',
        name: 'edit',
        component: () => import('./components/ArticleForm.vue'),
        props: true
      }]
    }
  ]
})
