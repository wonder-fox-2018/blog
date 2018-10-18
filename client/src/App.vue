<template>
  <div id="app">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <navbar :isLogin="isLogin" :changetoLogout="changetoLogout"></navbar>
      <addtaskmodal @to-parent-add-articles="addArticle"></addtaskmodal>
      <loginmodal :isLogin="isLogin" :changeStatusLogin="changeStatusLogin" @parent-iduser="setiduser"></loginmodal>
      <registermodal></registermodal>
      <router-view :isLogin="isLogin" :iduser="iduser" :changeStatusLogin="changeStatusLogin" :dataArticle="dataArticle" />
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/Navbar.vue'
import loginmodal from '@/components/LoginModal.vue'
import registermodal from '@/components/RegisterModal.vue'
import addtaskmodal from '@/components/AddTaskModal.vue'
/* eslint-disable */
export default {
  name: 'home',
  data () {
    return {
      iduser:'',
      isLogin: false,
      dataArticle:''
    }
  },
  methods:{
    setiduser(data){
      console.log(data)
      this.iduser=data
    },
    changetoLogout(){
      localStorage.removeItem('apptoken')
      this.isLogin=false
    },
    changeStatusLogin(){
        this.isLogin=true
    },
    addArticle(data){
      //console.log('---data-----',data)
      this.dataArticle=data 
      //console.log('-----this article---', this.dataArticle)
    }
  }, 
  components: {
    navbar,
    loginmodal,
    registermodal,
    addtaskmodal
  },
  created() {
    let apptoken=localStorage.getItem('apptoken')
    if(apptoken){
      this.$server.get(`/users`, {
          headers: { apptoken: apptoken }
      })
      .then(({data}) => {
        this.iduser=data.user._id
        if(this.isLogin==false)
            this.isLogin=true
      })
      .catch((err) => {
          console.log(err)
      });
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
