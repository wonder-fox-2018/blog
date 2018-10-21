<template>
  <div id="app">
  
    <navbar :setUser="setUser" :setMessage="setMessage" :setFilteredArticles='setFilteredArticles' :getArticles="getArticles" :user='user' :articles="articles"></navbar>
    <transition name="fade" mode="out-in">
      <router-view :setUser="setUser" :user='user' :articles="articles" :getArticles="getArticles"></router-view>
    </transition>
    <chatcomponent :setUser="setUser"></chatcomponent>
  </div>
</template>

<script>
  import axios from 'axios'
  import navbar from '@/components/Navbar.vue'
  import chatcomponent from '@/components/Chat.vue'
  
  export default {
    components: {
      navbar,
      chatcomponent
    },
    name: 'granparent',
    data() {
      return {
        user: '',
        message: '',
        filteredArticles : '',
        articles: '',
        token: localStorage.getItem('token') || ''
      }
    },
    created() {
      this.getArticles()
    },
    mounted() {
      if (this.token) {
        this.getUserByToken(this.token)
      }
      if (this.filteredArticles){
        this.articles = this.filteredArticles
      }
    },
    watch : {
      filteredArticles: function(newval){
        this.articles = newval
      }
    },
    methods: {
      setFilteredArticles : function(val){
        this.filteredArticles = val
      },
      setUser: function(val) {
        this.user = val
      },
      setMessage: function(val) {
        this.message = val
      },
  
      getArticles() {
        axios.get('http://localhost:3000/articles')
          .then((result) => {
            this.articles = result.data
          })
          .catch(function(error) {
            console.log(error);
          })
      },
  
      getUserByToken(token) {
        axios.get(`http://localhost:3000/users/verify/${token}`, {})
          .then((result) => {
            this.user = result.data
          })
          .catch(function(error) {
            console.log(error);
          })
      },
  
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
    box-sizing: border-box;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
