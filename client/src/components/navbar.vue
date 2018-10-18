<template>
  <div class="ui segment">
    <div class="ui grid">
      <div class="ui four wide column">
        <h2 @click="routeToHomePage">Blogtivate</h2>
      </div>
      <div class="ui eight wide column">
        <div class="ui mini fluid action input" v-if="showSearchInput">
          <input type="text" placeholder="Search...">
          <div class="ui button">Search</div>
        </div>
      </div>
      <div class="ui four wide column">
        <button class="ui right floated button" @click="routeToLoginPage" v-if="showLoginBtn && !currentUser">Login</button>
        <button class="ui right floated button" @click="routeToRegisterPage" v-if="showRegisterBtn && !currentUser">Register</button>
        <button class="ui right floated button" @click="$emit('logout')" v-if="currentUser">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['currentUser'],
  data () {
    return {
      showSearchInput: false,
      showLoginBtn: false,
      showRegisterBtn: false
    }
  },
  created () {
    if (this.$router.history.current.name === 'home' || this.$router.history.current.name === null) {
      this.routeToHomePage()
    } else if (this.$router.history.current.name === 'login') {
      this.routeToLoginPage()
    } else if (this.$router.history.current.name === 'register') {
      this.routeToRegisterPage()
    }
  },
  methods: {
    routeToLoginPage () {
      this.showSearchInput = false
      this.showRegisterBtn = true
      this.showLoginBtn = false
      this.$router.push('login')
    },
    routeToRegisterPage () {
      this.showSearchInput = false
      this.showRegisterBtn = false
      this.showLoginBtn = true
      this.$router.push('register')
    },
    routeToHomePage () {
      this.showSearchInput = true
      this.showRegisterBtn = true
      this.showLoginBtn = true
      this.$router.push('home')
    }
  }
}
</script>

<style>

</style>
