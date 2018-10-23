<template>
    <div class="page-login">
      <br><br><br><br>


  <div class="ui centered grid container">
    <h1>REGISTRATION PAGE</h1>
    <br><br>
    <div class="nine wide column">
      <div class="ui icon warning message" v-if="isFalse">
          <i class="lock icon"></i>
          <div class="content">
            <div class="header">
              Register failed!
            </div>
            <p>You're email and information is duplicate!</p>
          </div>
        </div>
      <div class="ui fluid card">
        <div class="content">
        <div class="ui form">
          <div class="field">
            <label>User</label>
            <input type="text" name="user" placeholder="User" v-model="name">
          </div>
          <div class="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" v-model="email">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="pass" placeholder="Password" v-model="password">
          </div>
          <button class="ui primary labeled icon button" @click="register">
            <i class="unlock alternate icon"></i>
            Register
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
      name: '',
      email: '',
      password: '',
      isFalse: false,
    };
  },
  methods: {
    register() {
      const self = this;
      axios.post(`${baseurl}/users`, {
        name: self.name,
        email: self.email,
        password: self.password,
      }).then((data) => {
        data.data.password = self.password;
        const kirim = data.data;
        this.$emit('kirimdata', kirim);
        this.$router.push('/signin');
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>

</style>
