<template>
  <div id="app">
    <navbar :isLogin="isLogin" :updateLogin="updateLogin" @filterArticle="filterArticle"></navbar>
    <div class="container-fluid">
        <div class="main">
          <router-view :updateLogin="updateLogin" :isLogin="isLogin" :findArticle="findArticle"/>
        </div>
    </div>
  </div>
</template>
<script>
import navbar from '@/components/navbar-components/navbar.vue';

export default {
  data() {
    return {
      isLogin: false,
      findArticle: ''
    };
  },
  components: {
    navbar,
  },
  mounted() {
    this.updateLogin();
  },
  methods: {
    updateLogin() {
      if (localStorage.getItem('access-token')) {
        this.isLogin = true
      } else {
        this.isLogin = false;
      }
    },

    filterArticle(val) {
      this.findArticle = val;
    }
  },
  created() {
    
  },
  watch: {
    
  },
};
</script>
<style>
#app {
  font-family: 'Roboto', sans-serif;
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
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none !important;
  color: black;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
