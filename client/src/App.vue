<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container-fluid" id="marginTopCustom">
      <div class="row">
        <div class="col-md-2">
          <Sidebar :listarticles="listarticles" ></Sidebar>
        </div>
        <div class="col-md-10">
          <h1>This is Article</h1>
        </div>
      </div>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    -->
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Navbar, Sidebar
  },
  data () {
    return {
      listarticles: []
    }
  },
  created () {
    let self = this
    axios({
      method: 'GET',
      url: 'http://localhost:3009/articles/lists'
    })
      .then(articles => {
        console.log('Result-----', articles.data.data)
        self.listarticles = articles.data.data
      })
      .catch(error => {
        console.log('ERROR Get List Articles ', error)
      })
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

#marginTopCustom {
  margin-top: 60px;
  position: absolute;
}
</style>
