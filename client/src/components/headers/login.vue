<template>
    <div class="page-login">
      <br><br><br><br>
  <div class="ui centered grid container" v-if="!token">
    <h1>LOGIN PAGE : </h1>
    <br><br><br>
    <div class="nine wide column">
      <div class="ui icon warning message" v-if="isFalse">
          <i class="lock icon"></i>
          <div class="content">
            <div class="header">
              Login failed!
            </div>
            <p>You might have misspelled your username or password!</p>
          </div>
        </div>
      <div class="ui fluid card">
        <div class="content">
        <div class="ui form">
          <div class="field">
            <label>Email</label>
            <input type="text" name="user" placeholder="User" v-model="email">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="pass" placeholder="Password" v-model="password">
          </div>
          <button class="ui primary labeled icon button" type="submit" @click="login">
            <i class="unlock alternate icon"></i>
            Login
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
var baseurl='https://blog.agusrr.xyz'
export default {
  data() {
    return {
      email: this.register.email || '',
      password: this.register.password || '',
      isFalse: false,
      token: '',
    };
  },
  props: ['register'],
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      const self = this;
      axios.post(`${baseurl}/users/login`, {
        email,
        password,
      })
        .then((data) => {
          self.isFalse = false;
          localStorage.setItem('token', data.data.token);
          self.token = data.data.token;
          self.$emit('set-token', data.data.token);
          this.$router.push('/detail');
          // windows.location()
          // location.reload()
        })
        .catch((err) => {
          self.isFalse = true;
          console.log(err);
        });
    },
    terimadata(val) {
      console.log(val);
    },
  },
  created() {
    this.token = localStorage.getItem('token');
  },
};
</script>

<style>

</style>
|
