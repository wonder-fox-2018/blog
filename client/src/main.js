import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFormGenerator from "vue-form-generator"
import "vue-form-generator/dist/vfg-core.css"
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueFormGenerator)
Vue.prototype.server = axios.create({
  baseURL:'http://localhost:3000'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
