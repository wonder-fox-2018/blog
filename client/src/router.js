import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import mainContent from './views/mainContent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: mainContent,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'detailArticle',
          path: '/articles/:id',
          component: () => import('./components/DetailArticle.vue')
        }
      ]
    }
  ]
})
