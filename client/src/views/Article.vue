<template>
   <div id="marginleftcustom">
     <router-view :islogin="islogin"
     :userbasicinfo="userbasicinfo"
     :listarticles="listarticles"></router-view>
   </div>
</template>
<script>
import Allarticles from '@/views/Allarticles.vue'
export default {
  name: 'Article',
  props: ['islogin', 'userbasicinfo', 'listarticles'],
  components: {
    Allarticles
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
