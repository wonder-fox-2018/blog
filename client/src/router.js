import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Allarticles from './views/Allarticles.vue'
import Detailarticle from './views/Detailarticle.vue'
import Addarticle from './views/Addarticle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Article,
      redirect: '/article'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      children: [{
        path: '/',
        name: 'Allarticles',
        component: Allarticles
      },
      {
        path: '/article/add',
        name: 'addarticle',
        component: Addarticle,
        props: true
      },
      {
        path: ':id',
        name: 'id',
        component: Detailarticle,
        props: true
      }]
    }
  ]
})
