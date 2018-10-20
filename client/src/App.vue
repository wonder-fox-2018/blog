<template>
  <div id="app">
      <div class="section" id="b-section-header" name="Header"><div class="widget Header" data-version="2" id="Header1">
        <div class="header image-placement-behind no-image">
          <div class="container">
            <h1><a href="">BlogTiv</a></h1>
            <p>BlogTiv</p>
          </div>
          </div>
        </div>
      </div>
      <navbar :isLogin="isLogin" :gettoken="getToken"></navbar>

      <bigcontainer @searchArticle="setSearch" :article="article" :isLogin="isLogin"></bigcontainer>
      <!-- <container :article="article"></container> -->
      <footers></footers>

      <!-- modal components -->
      <modalRegister></modalRegister>
      <modalLogin  :gettoken="getToken"></modalLogin>
      <modalArticle :getarticle="getArticle"></modalArticle>
  </div>
</template>

<script>
  import navbar from '@/components/navbar.vue'
  import bigcontainer from '@/components/bigContainer.vue'
  // import container from '@/components/container.vue'
  import footers from '@/components/footers.vue'
  import modalRegister from '@/components/modalRegister.vue'
  import modalLogin from '@/components/modalLogin.vue'
  import modalArticle from '@/components/modalArticle.vue'

  export default {
    components : {
      navbar,
      bigcontainer,
      // container,
      footers,
      modalRegister,
      modalLogin,
      modalArticle
    },
    data : function(){
      return {
        isLogin : false ,
        user : {
          username : '',
          role : '',
          id : '',
          email : ''
        },
        article : [],
        search : ''
      }
    },
    created : function(){
      this.getToken()
      this.getArticle()
    },
    watch: {
      search() {
        if(this.search.length > 0){
          console.log(this.search)
          this.searchArticle()
        }
        else {
          this.getArticle()
        }
      },
    },
    methods : {
      setSearch(value){
        this.search = value
      },
      searchArticle(){
        axios({
          method : 'GET',
          url : `http://localhost:3000/articles/search/${this.search}`
        })
        .then(response => {
          console.log(response.data)
          this.article = response.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      getToken() {
        let token = localStorage.getItem('token')
        if(token){
          this.isLogin = true
        }
        else{
          this.isLogin = false
        }
      },
      getArticle : function(){
        axios({
          method : 'GET',
          url : 'http://localhost:3000/articles/show',
        })
        .then(response => {
          let article = response.data
          this.article = response.data
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>


<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
