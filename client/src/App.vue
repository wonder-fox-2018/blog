<template>
  <div id="app">
    <div id="nav">
    <navbar :user="user" :setUser="setUser"></navbar>
    <footer></footer>
    </div>
    <router-view :user='user'></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '@/components/Navbar.vue'
import footer from '@/components/footer.vue'

export default {
  data() {
    return {
      server: 'http://localhost:3000',
      user: null,
    }
  },
  components : {
    navbar,
    footer
  },
  methods: {
    isLogin : function() {

    },
    setUser: function() {
      let token = localStorage.getItem('blogToken')
      if(token){                
        axios({
          method: 'GET',
          url: `${this.server}/users`,
          headers: {
            token: token
          }
        })
        .then((result) => {
          this.user = result.data.decoded
        }).catch((err) => {
          localStorage.removeItem('blogToken')
          this.user = null
          console.log(err.response);
        });
      } else {
        this.user = null
      }
    }
  },
  created() {
    this.setUser()        
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>
