import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$server = axios.create({
  baseURL: 'http://localhost:3000'
})
// Vue.prototype.$server = axios.create({
//   baseURL: 'http://35.187.249.174:3000'
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
