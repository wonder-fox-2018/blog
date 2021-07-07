<template lang="html">
  <section class="navbar">
    <div class="navwrapper">
      <div id="nav">
  
        <div class="linkBar">
          <div class='searchbar'>
            <searcbar :schema='schema' :model='model'></searcbar>
          </div>
          <div v-if="user">
            <router-link to="/creator" :getArticles="getArticles">+ NEW ARTICLE</router-link>
          </div>
        </div>
  
        <div class="logoSect">
          <router-link to="/" :getArticles="getArticles">H8LOG</router-link>
        </div>
  
        <div class="linkBar">
          <div>
            <router-link to="/" :getArticles="getArticles">ARTICLES</router-link>
          </div>
          <div>
            <router-link to="/about">ABOUT</router-link>
          </div>
          <div>
            <router-link to="/register" v-if="!user">SIGN UP</router-link>
          </div>
          <div>
            <router-link to="/login" v-if="!user" :setUser='setUser'>SIGN IN</router-link>
            <div v-if="user" v-on:click="signOut">LOG OUT</div>
          </div>
        </div>
  
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import $ from "jquery";
  import VueForm from 'vue-form-generator';
  import axios from 'axios'
  
  export default {
    name: 'navbar',
    props: ['setUser', 'setMessage', 'user', 'articles', 'getArticles', 'setFilteredArticles'],
    components: {
      "searcbar": VueForm.component
    },
    data() {
      return {
        model: {
          searchinput: ''
        },
  
        schema: {
          fields: [{
            type: 'input',
            inputType: 'text',
            model: 'searchinput',
            placeholder: 'search ...',
            buttons: [{
              classes: 'btn',
              label: 'Search',
              onclick: (model)=> {
                if(model.searchinput){
                  this.getSearch()
                }
              }
            },{
              classes: 'btn-clear',
              label: 'Clear',
              onclick: ()=> {
                this.model.searchinput = ''
                this.getArticles()
              }
            }]
          }]
        }
      }
    },
  
    methods: {
      getSearch(){
        this.$router.push('/')
        let self = this
        axios.post('http://localhost:3000/articles/search', {
                    searchinput : this.model.searchinput
                  })
                  .then((result) => {
                    self.setFilteredArticles(result.data)
                  })
                  .catch(function(error) {
                    console.log(error);
                  })
      },
      signOut() {
        localStorage.clear()
        this.setUser('')
      }
    },
    created() {
      $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
          $('#nav').css('background-image', 'linear-gradient(-60deg, #ebebeb, rgba(246, 246, 246, 0.4))');
        } else {
          $('#nav').css('background-image', 'linear-gradient(-60deg, #ebebeb, #fafafa)');
        }
      });
  
    }
  }
</script>

<style scoped lang="css">
  .navbar {
    padding: 0px;
  }
  
  .navwrapper {
    min-height: 60px;
  }
  
  #nav {
    z-index: 100;
    background-image: linear-gradient(-60deg, #ebebeb, #fafafa);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(50px, auto);
    width: 100%;
    margin: 0 auto;
    height: 60px;
    grid-gap: 10px;
    text-shadow: 0 0 2px rgb(175, 210, 255);
    /* background-color: rgba(246, 246, 246, 0.5); */
    box-shadow: 0 0 10px #525252;
    top: 0;
    left: 0;
    position: fixed;
  }
  
  header div {
    align-self: center;
  }
  
  .logoSect {
    padding: 5px;
    font-size: 40px;
  }
  
  .linkBar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: minmax(20px, auto);
    font-size: 16px;
    align-items: center;
  }
  
  .linkBar div:hover {
    margin-top: -6px;
    transition: 0.3s;
    text-shadow: 3px 3px 2px #fff9fb;
    cursor: pointer;
  }
  
  #nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  
  .searchbar {
    grid-column: 1/4;
    margin: 15px 10px 0 10px;
  }
  
  .linkBar .searchbar:hover {
    margin: 15px 10px 0 10px;
  }
</style>
