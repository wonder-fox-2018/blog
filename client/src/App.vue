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
      <navbar :isLogin="isLogin"></navbar>

      <container :article="article"></container>
      <footers></footers>

      <!-- modal components -->
      <modalRegister></modalRegister>
      <modalLogin></modalLogin>
  </div>
</template>

<script>
  import navbar from '@/components/navbar.vue'
  import container from '@/components/container.vue'
  import footers from '@/components/footers.vue'
  import modalRegister from '@/components/modalRegister.vue'
  import modalLogin from '@/components/modalLogin.vue'

  export default {
    components : {
      navbar,
      container,
      footers,
      modalRegister,
      modalLogin
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
        article : {
          articleID : '1', 
          author : 'franshiro',
          title : 'Tensei Shitara Slime Datta Ken',
          category : 'manga',
          img : 'https://www.manga-news.com/public/images/pix/dvd/3567/Tensei-shitara-slime-datta-ken-anime-visual.jpg',
          articleContent : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!',
          date : this.getDate()

        }
      }
    },
    created : function(){
      this.getToken()
    },
    methods : {
      getToken() {
        this.isLogin = false
        console.log(this.isLogin)
      },
      getDate(){
        let date = new Date()
        let month = date.getMonth() + 1
        let monthInWord = ''
        let day = date.getDate()
        let year = date.getFullYear()
        switch (month) {
          case 10:
            monthInWord = 'Oktober'
            break;

          default:
            break;
        }
        return `${day},${monthInWord} ${year}`
      }
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
