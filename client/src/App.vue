<template>
  <div id="app">
    <!-- Navigation -->
    <navbar @trigger-change="triggerChange" @islogin-data="isLogin" @isadmin-data="isAdmin"></navbar>
    <!-- Content -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name : 'app',
  data () {
    return {
      isadmin : '',
      islogin : ''
    }
  },
  components : {
    Navbar
  },
  methods : {
    isLogin(val) {
      this.islogin = val
    },
    isAdmin(val) {
      this.isadmin = val
    },
    triggerChange(val) {
      
    }
  }
}


</script>
