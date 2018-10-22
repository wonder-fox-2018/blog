<template>
  <div id="app">
    <navbar @tompoen="ikilo" @clearToken="removeToken" :tokenset="token"></navbar>
    <router-view :deletereceived="statdelete" @kirimdelete="kabardelete" @kirimdata="isiregister" :register="registerdata" @set-token="setTokenAtParent"></router-view>
  </div>
</template>
<script>
import Navbar from '@/components/headers/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import axios from 'axios';

export default {
  components: {
    Navbar, Sidebar,
  },
  data() {
    return {
      token: '',
      registerdata: '',
      statdelete: false,
    };
  },
  methods: {
    setTokenAtParent(token) {
      this.token = token;
    },
    removeToken() {
      this.token = '';
    },
    isiregister(val) {
      this.registerdata = val;
    },
    kabardelete() {
      this.statdelete = !this.statdelete;
    },
    ikilo(val) {
      this.$router.push({
        name: 'articlessearch', params: { search: val },
      });
    },
  },
  created() {
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.$router.push('/detail');
    }
  },
};

</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
