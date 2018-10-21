import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'
import Verify from './views/verify.vue'
import Articles from './components/articles.vue'
import CreateArticle from './components/createArticle.vue'
import DetailArticle from './components/detailArticle.vue'
import EditArticle from './components/editArticle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
          path: '',
          name: 'articles',
          component: Articles
        },
        {
          path: 'create',
          name: 'create-article',
          component: CreateArticle
        },
        {
          path: 'article/:id/update',
          name: 'edit-article',
          component: EditArticle
        },
        {
          path: 'article/:id',
          name: 'detail-article',
          component: DetailArticle
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/verify/:token',
      name: 'verify',
      component: Verify
    }
  ]
})
