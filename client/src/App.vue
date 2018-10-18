<template>
  <div id="app">
    <div class="container" style="width:1100px; margin: 0 auto; padding:10px;">
      <NavBar @status-login="statusLogin"  @status-email="statusEmail"/>
      <router-view :is-login="isLogin" :user-email="userEmail"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarComponent/index.vue";

export default {
  components: {
    NavBar
  },
  data: function() {
    return {
      isLogin: false,
      userEmail: ""
    };
  },
  methods: {
    statusLogin: function(val) {
      this.isLogin = val;
    },
    statusEmail: function(val) {
      this.userEmail = val;
    }
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
