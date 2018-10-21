<template>
  <div id="app">
    <Navbar @userbasicinfo="getuserbasicinfo" @islogin="getislogin" ></Navbar>
    <div class="container-fluid" id="marginTopCustom">
      <div class="row">
        <div class="col-md-2">
          <Sidebar :listarticles="listarticles"
                :userbasicinfo="userbasicinfo"
                @searcharticles="searcharticles"></Sidebar>
        </div>
        <div class="col-md-10">
          <router-view :islogin="islogin"
          :userbasicinfo="userbasicinfo"
          :listarticles="listarticles"></router-view>
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
import Article from '@/views/Article.vue'
export default {
  components: {
    Navbar, Sidebar, Article
  },
  data () {
    return {
      listarticles: [],
      islogin: false,
      userbasicinfo: {},
      keyword: ''
    }
  },
  methods: {
    getallarticle () {
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
    },
    getislogin (val) {
      this.islogin = val
    },
    getuserbasicinfo (val) {
      this.userbasicinfo = val
    },
    searcharticles (val) {
      this.keyword = val
      let self = this
      console.log('THis is keyword----', self.keyword)
      // get selected data
      axios({
        method: 'POST',
        url: 'http://localhost:3009/articles/search',
        data: {
          keyword: self.keyword
        }
      })
        .then(articles => {
          console.log('Result Search---', articles.data.data)
          self.listarticles = articles.data.data
          // empty the keyword
          self.keyword = ''
        })
        .catch(error => {
          console.log('ERROR Get Sorted Articles ', error)
        })
    }
  },
  created () {
    this.getallarticle()
  },
  watch: {
    islogin (val) {},
    userbasicinfo (val) {},
    keyword (val) {},
    listarticles (val) {}
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
