<template>
  <div class="ui centered grid">
    <div class="ui six wide column">
      <div class="ui mini warning message" v-if="warnNotif === 1">
        <div class="header">
          {{ headerMsg }}
        </div>
        {{ msg }}
      </div>
      <h2 style="text-align:center; margin-top:50px;">Register</h2>
      <div class="ui form segment">
        <div class="two fields">
          <div class="field required">
            <label>First name</label>
            <input type="text" placeholder="First name" v-model="formFname">
          </div>
          <div class="field">
            <label>Last name</label>
            <input type="text" placeholder="Last name" v-model="formLname">
          </div>
        </div>
        <div class="three fields">
          <div class="field required">
            <label>Email</label>
            <input type="text" placeholder="Email" v-model="formEmail">
          </div>
          <div class="field required">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="formPassword">
          </div>
          <div class="field required">
            <label>Re-type Password</label>
            <input type="password" placeholder="Password" v-model="formRePassword">
          </div>
        </div>
        <div class="field">
          <button class="ui mini fluid button" @click="register">Submit</button>
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
  name: 'register',
  props: ['currentUser'],
  data () {
    return {
      warnNotif: 0,
      headerMsg: '',
      msg: '',

      formEmail: '',
      formPassword: '',
      formRePassword: '',
      formFname: '',
      formLname: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$router.push('home')
    }
  },
  methods: {
    register () {
      this.warnNotif = 0
      if (this.formPassword === this.formRePassword) {
        axios({
          url: `${host}/users/register`,
          method: 'post',
          data: {
            fname: this.formFname,
            lname: this.formLname,
            email: this.formEmail,
            password: this.formPassword
          }
        })
          .then(data => {
            this.$router.push('login')
          })
          .catch(err => {
            this.warnNotif = 1
            this.headerMsg = "Ooops.. seems like your input does'nt follow our requirement"
            this.msg = err.response.data.message
          })
      } else {
        this.warnNotif = 1
        this.headerMsg = "Ooops.. seems like your input does'nt follow our requirement"
        this.msg = "Your password did'nt match"
      }
    }
  }
}
</script>

<style>

</style>
