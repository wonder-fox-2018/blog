import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Article from './views/Article.vue'
import OneArticle from './components/OneArticle.vue'
import AllArticles from './components/AllArticles.vue'
import Profile from './components/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "link_active",
  linkExactActiveClass: "myLink",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: Profile
    },
    {
      path: '/articles',
      name: 'articles',
      component: Article,
      children: [{
        path: '/articles/:id',
        name: 'id',
        component: OneArticle,
        props: true
      },
      {
        path: '/',
        name: 'allarticles',
        component: AllArticles,
      }]
    }
  ]
})
