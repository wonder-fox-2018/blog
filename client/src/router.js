import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/",
          name: "AllArticle",
          component: () =>
            import("./components/HomeComponent/ContentComponent/AllArticle.vue")
        },
        {
          path: "/article/create",
          name: "CreateArticle",
          component: () =>
            import("./components/HomeComponent/ContentComponent/CreateArticle.vue"),
          beforeEnter: (to, from, next) => {
            let token = localStorage.getItem("token");
            if (!token) {
              console.log(token);

              next(from.fullPath);
            } else {
              console.log("====", token);

              next();
            }
          }
        },
        {
          path: "/article/:id",
          name: "DetailArticle",
          component: () =>
            import("./components/HomeComponent/ContentComponent/DetailArticle.vue")
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ]
});
