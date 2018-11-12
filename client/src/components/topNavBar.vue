<template>
  <div class="ui grid segment">
    <div class="ui three wide column" @click="homeBtnClicked">
      <h2>Blogtivate</h2>
    </div>
    <div class="ui ten wide column">
      <searchBox v-if="currentView !== 'login' || currentView !== 'register' " :list-categories="listCategories" @query-title="$emit('query-title', $event)" @query-category="$emit('query-category', $event)"/>
    </div>
    <div class="ui three wide column form" v-if="!currentUser">
      <div class="ui right floated button" @click="loginBtnClicked" v-if="currentView !== 'login'">login</div>
      <div class="ui right floated button" @click="registerBtnClicked" v-if="currentView !== 'register'" >register</div>
    </div>
    <div class="ui three wide column form" v-else="!currentUser">
      <div class="ui right floated button" @click="logoutBtnClicked">logout</div>
    </div>
  </div>
</template>

<script>
import searchBox from '@/components/searchBox'

export default {
  name: 'topNavBar',
  props: ['currentView', 'currentUser', 'listCategories'],
  components: {
    searchBox
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    logoutBtnClicked() {
      localStorage.removeItem('token')
      this.$router.push({ path: '/' })
      this.$emit('get-user')
    },
    loginBtnClicked() {
      this.$router.push({ path: '/login' })
      this.$emit('change-view')
    },
    registerBtnClicked() {
      this.$router.push({ path: '/register' })
      this.$emit('change-view')
    },
    homeBtnClicked() {
      this.$router.push({ path: '/' })
      this.$emit('change-view')
    }
  }
}
</script>

<style>

</style>
