<template>
  <div id="app">
    <navbar :current-user="currentUser" @logout="logout"/>
    <!-- <router-view :current-user="currentUser" @get-user-data="getCurrentUserData"/> -->
  </div>
</template>

<script>
import axios from 'axios'
import config from './config.js'
import navbar from './components/navbar.vue'

const { host } = config

export default {
  components: {
    navbar
  },
  data () {
    return {
      currentUser: null
    }
  },
  created () {
    this.isAlreadyLogin()
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.currentUser = null
    },
    isAlreadyLogin () {
      let token = localStorage.getItem('token')
      if (token) {
        this.getCurrentUserData()
      }
    },
    getCurrentUserData () {
      axios({
        url: `${host}/users`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.currentUser = data.data.data
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>
</style>
