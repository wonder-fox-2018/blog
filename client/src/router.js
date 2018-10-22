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
      component: Home,
      children: [
        {
          path: '/author/:authorId',
          name: 'authorprofile',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ './views/Author.vue')
        }
      ]
    },
    {
      path: '/article/:articleId',
      name: 'completearticle',
      component: () => import(/* webpackChunkName: "about" */ './views/Article.vue')
    },
    {
      path: '/edit/:articleId',
      name: 'editarticle',
      component: () => import(/* webpackChunkName: "about" */ './views/EditArticle.vue')
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
      path: '/myprofile',
      name: 'myprofile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyProfile.vue')
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MyArticle.vue')
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/CreateArticle.vue')
    }
  ]
})
