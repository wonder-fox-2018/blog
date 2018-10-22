import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;
Vue.prototype.$server = axios.create({ baseURL: 'https://blog.payogaputra.com' });


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
