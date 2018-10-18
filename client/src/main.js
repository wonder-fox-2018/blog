import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$serverUser = axios.create({
  baseUrl: `http://localhost:3000/users`
})

Vue.prototype.$serverArticle = axios.create({
  baseUrl: `http://localhost:3000/articles`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
