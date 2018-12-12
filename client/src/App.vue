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

      <bigcontainer v-if="show" @searchArticle="setSearch" :updatecomponent="updateComponent" :article="article" :isLogin="isLogin"></bigcontainer>
      <!-- <container :article="article"></container> -->
      <footers></footers>

      <!-- modal components -->
      <modalRegister></modalRegister>
      <modalLogin  :gettoken="getToken"></modalLogin>
      <modalArticle :getarticle="getArticle" :updatecomponent="updateComponent"></modalArticle>
      <!-- <modalEdit></modalEdit> -->
  </div>
</template>

<script>
  import config from '@/config.js'
  import navbar from '@/components/navbar.vue'
  import bigcontainer from '@/components/bigContainer.vue'
  // import container from '@/components/container.vue'
  import footers from '@/components/footers.vue'
  import modalRegister from '@/components/modalRegister.vue'
  import modalLogin from '@/components/modalLogin.vue'
  import modalArticle from '@/components/modalArticle.vue'
  // import modalEdit from '@/components/modalEdit.vue'

  export default {
    components : {
      navbar,
      bigcontainer,
      // container,
      footers,
      modalRegister,
      modalLogin,
      modalArticle,
      // modalEdit
    },
    data : function(){
      return {
        chatShow : false,
        show : true,
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
      updateComponent() {
        this.show = false

        this.$nextTick(function() {
          this.show = true
        })
        this.getArticle()
      },
      setSearch(value){
        this.search = value
      },
      searchArticle(){
        axios({
          method : 'GET',
          url : `${config.port}/articles/search/${this.search}`
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
          url : `${config.port}/articles/show`,
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
  .list-img{
    margin: 3%;
    border-radius: 5px;
  }
  .list-content{
    margin: 3%;
  }
</style>
