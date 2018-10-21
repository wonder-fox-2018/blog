<template>
   <div id="marginleftcustom">
     <router-view
     :getallarticle="getallarticle"
     :islogin="islogin"
     :userbasicinfo="userbasicinfo"
     :listarticles="listarticles"></router-view>
   </div>
</template>
<script>
import Allarticles from '@/views/Allarticles.vue'
import Detailarticle from '@/views/Detailarticle.vue'
import Addarticle from '@/views/Addarticle.vue'
export default {
  name: 'Article',
  props: ['islogin', 'userbasicinfo', 'listarticles', 'getallarticle'],
  components: {
    Allarticles, Detailarticle, Addarticle
  },
  watch: {
    islogin (val) {},
    userbasicinfo (val) {},
    listarticles (val) {}
  }
}
</script>

<style>
#marginleftcustom {
  margin-left: 100px
}
</style>
