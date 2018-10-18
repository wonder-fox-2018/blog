<template>
  <div class="ui centered grid">
    <div class="ui four wide column">
      <div class="ui mini warning message" v-if="warnNotif === 1">
        <div class="header">
          {{ headerMsg }}
        </div>
        {{ msg }}
      </div>
      <h2 style="text-align:center; margin-top:50px;">Login</h2>
      <div class="ui form segment">
        <div class="field">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="formEmail">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" placeholder="Password" v-model="formPassword">
        </div>
        <div class="field">
          <button class="ui mini fluid button" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'

const { host } = config

export default {
  name: 'Login',
  props: ['currentUser'],
  data () {
    return {
      formEmail: '',
      formPassword: '',

      warnNotif: 0,
      headerMsg: '',
      msg: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$router.push('home')
    }
  },
  methods: {
    login () {
      this.warnNotif = 0
      axios({
        url: `${host}/users/login`,
        method: 'post',
        data: {
          email: this.formEmail,
          password: this.formPassword
        }
      })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.$emit('get-user-data')
          this.$router.push('home')
        })
        .catch(err => {
          if (err.response.data.message === 'user not found') {
            this.warnNotif = 1
            this.headerMsg = 'You must register before you can do that!'
            this.msg = 'Visit our registration page, then try again'
          } else if (err.response.data.message === 'wrong password or email') {
            this.warnNotif = 1
            this.headerMsg = 'Oops..!  Seems someone forgot the password'
            this.msg = 'Re-think for a minutes for your password, then try again'
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style>

</style>
