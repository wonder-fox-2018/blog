import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import SocialSharing from 'vue-social-sharing'

Vue.use(SocialSharing)

Vue.use(wysiwyg, {
  forcePlainTextOnPaste: true,
  maxHeight: '500px'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
