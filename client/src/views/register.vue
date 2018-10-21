<template>
  <div class="ui centered grid">
    <div class="ui six wide column">
       <h2>
         Register
        </h2>
      <div class="ui segment form">
        <div class="two fields">
          <div class="field">
            <label>First name</label>
            <input type="text" placeholder="First name" v-model="fnameForm">
          </div>
          <div class="field">
            <label>Last name</label>
            <input type="text" placeholder="Last name" v-model="lnameForm">
          </div>
        </div>
        <div class="three fields">
          <div class="field">
            <label>Email</label>
            <input type="text" placeholder="First name" v-model="emailForm">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" placeholder="password" v-model="password1Form">
          </div>
          <div class="field">
            <label>Re-type password</label>
            <input type="password" placeholder="re-type your password" v-model="password2Form">
          </div>
        </div>
        <div class="field">
          <button class="ui fluid mini button" @click="register">Submit</button>
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
  name: 'register',
  data() {
    return {
      fnameForm: '',
      lnameForm: '',
      emailForm: '',
      password1Form: '',
      password2Form: ''
    }
  },
  created() {
    this.isAllowedToVisit()
  },
  methods: {
    register() {
      if (this.password1Form === this.password2Form && this.password1Form !== '') {
        axios({
          url: host + '/users/register',
          method: 'post',
          data: {
            fname: this.fnameForm,
            lname: this.lnameForm,
            email: this.emailForm,
            password: this.password1Form
          }
        })
          .then(data => {
            this.$emit('notif-changer', {
              size: 'six',
              header: 'Success',
              message: `Yuhuu.. ${
                data.data.message
              }, and please VERIFY YOUR EMAIL before you login`,
              status: 'positive',
              timeOut: 10000
            })
            this.$router.push({ path: '/login' })
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
          message: "Opss.. Your password did'nt match",
          status: 'negative'
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
