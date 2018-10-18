<template lang="html">

  <section class="navbar">
    <div class="navwrapper">
      <div id="nav">
      
        <div class="linkBar">
          <div><router-link to="/forms">FORMS</router-link></div>
          <div v-if="user"><router-link to="/creator" :getArticles="getArticles">CREATE</router-link></div>
          <div>HELP</div>
          <div v-if="user" v-on:click="signOut">SIGN OUT</div>
        </div>

        <div class="logoSect">H8 </div>

        <div class="linkBar">
          <div><router-link to="/" :getArticles="getArticles">HOME</router-link> </div>
          <div><router-link to="/about">ABOUT</router-link> </div>
          <div><router-link to="/register" v-if="!user">SIGN UP</router-link></div>
          <div><router-link to="/login" v-if="!user" :setUser='setUser'>SIGN IN</router-link></div>
        </div>

      </div>
    </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'navbar',
    props: ['setUser','setMessage','user','articles','getArticles'],
    data() {
      return {
       
      }
    },
    mounted() {
      
    },
    watch: { 
      user: {
        handler (val) {
          this.user = val
        },
        immediate: true, 
        deep: true,
      },
        
    },
    methods: {
      signOut(){
        localStorage.clear()
        this.setUser('')
        this.setMessage('Logout Success')
      }
    },
    computed: {

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
    transition: .3s;
    text-shadow: 3px 3px 2px #FFF9FB;
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
</style>
