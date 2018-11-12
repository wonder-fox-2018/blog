<template>
  <div class="ui centered grid">
    <div class="ui three wide column form">
      <h2>Login</h2>
      <div class="ui segment">
        <div class="field">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="emailForm">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" placeholder="Password" v-model="passwordForm">
        </div>
        <div class="field">
          <button class="ui fluid mini button" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'login',
  data() {
    return {
      emailForm: '',
      passwordForm: ''
    }
  },
  created() {
    this.isAllowedToVisit()
  },
  methods: {
    login() {
      if (this.emailForm && this.passwordForm) {
        axios({
          url: host + '/users/login',
          method: 'post',
          data: {
            email: this.emailForm,
            password: this.passwordForm
          }
        })
          .then(data => {
            localStorage.setItem('token', data.data.token)
            this.$emit('notif-changer', {
              size: 'six',
              header: 'Login Success',
              message: `Welcome ${data.data.fname}, Happy Blogging`,
              status: 'positive',
              timeOut: 5000
            })
            this.$emit('get-user')
            this.$router.push({ path: '/' })
            this.$emit('change-view')
          })
          .catch(err => {
            this.$emit('notif-changer', {
              size: 'six',
              header: 'Error',
              message: `Opss.. ${err.response.data.message}`,
              status: 'negative',
              timeOut: 5000
            })
          })
      } else {
        this.$emit('notif-changer', {
          size: 'six',
          header: 'Error',
          message: 'Opss.. You forget to fill the form',
          status: 'negative',
          timeOut: 5000
        })
      }
    },
    isAllowedToVisit() {
      let token = localStorage.getItem('token')
      if (token) {
        axios({
          url: host + '/users',
          headers: {
            token: token
          }
        })
          .then(data => {
            this.$router.push('/')
            this.$emit('change-view')
          })
          .catch(err => {})
      }
    }
  }
}
</script>

<style>

</style>
