<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

      <div class="container flex-grow-1">
        <a class="navbar-brand" href="http://localhost:8080">Blog Overflow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link"><router-link to="/signin" v-if='!token'>Signin</router-link></a>
            </li>

            <li class="nav-item">
              <a class="nav-link"><router-link to="/register" v-if='!token'>Register</router-link></a>
            </li>
            <input id="cari" type="text" v-model="word" @keyup="searching" placeholder="Search..">
            <li class="nav-item">
              <button @click='logout' v-if='token'>Logout</button>
            </li>
          </ul>
        </div>
      </div>
 </nav>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.token = '';
      this.$emit('clearToken');
      this.$router.push('/register');
    },
    searching() {
      if(localStorage.getItem('token')){
          this.$emit('tompoen', this.word);
      }
    },
  },
  props: ['tokenset', 'register'],
  data() {
    return {
      token: '',
      word: '',
    };
  },
  created() {
    this.token = localStorage.getItem('token');
  },
  watch: {
    tokenset() {
      this.token = this.tokenset;
    },
  },
};
</script>
<style>
</style>
