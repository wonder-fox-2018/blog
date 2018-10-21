import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

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
      path: '/about',
      name: 'about',
      // props: { msg : 'Learn passing data between props in Vue CLI' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path : '/article',
      name : 'article',
      component : () => import('./views/myarticle.vue'),
      children : [
        {
          path : '/article/:id/detail',
          name : 'detailArticle',
          props : true,
          component : () => import('./components/detailArticle.vue')
        },
        {
          path : '/article/myList/:category',
          name : 'myList',
          props : true,
          component : () => import('./components/myList.vue')
        }
      ]
    }
  ]
})