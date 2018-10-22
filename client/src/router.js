import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
      children: [
        {
          path: 'newarticles',
          name: 'newarticles',
          component: () => import(/* webpackChunkName: "about" */ './components/newarticle.vue'),
        },
        {
          path: 'chatroom',
          name: 'chatroom',
          component: () => import(/* webpackChunkName: "about" */ './components/chatroom.vue'),
        },
        {
          path: 'edituser',
          name: 'edituser',
          component: () => import(/* webpackChunkName: "about" */ './components/edituser.vue'),
        },
        {
          path: 'data/:id',
          name: 'articles-detail',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ './components/articlesdetail.vue'),
        },
        {
          path: 'data/:search',
          name: 'articlessearch',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ './components/searching.vue'),
        },
      ],
    },
    {
      path: '/articles',
      name: 'article',
      component: () => import(/* webpackChunkName: "about" */ './components/myallarticles.vue'),
    },
    {
      path: '/myarticles',
      name: 'myarticles',
      component: () => import(/* webpackChunkName: "about" */ './components/myarticle.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './components/headers/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './components/headers/register.vue'),
    },
  ],
});
