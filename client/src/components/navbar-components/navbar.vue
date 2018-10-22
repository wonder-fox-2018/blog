<template>
<div class="flex-column">
  <div class="jumbotron jumbotron-fluid header">
    <div class="container">
      <h1 class="display-2"><i class="fab fa-envira"></i>Echo</h1>
      <p class="lead">share your mind here</p>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand"><router-link to="/"><i class="fab fa-envira"></i></router-link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link">
            <router-link to="/"><i class="fas fa-home"></i></router-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" v-if="!isLogin">
            <router-link to="/login">Join here</router-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search by keyword" aria-label="Search" v-model="filterArticle">
      </form>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-if="isLogin" @click="logOut">log out</button>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['isLogin', 'updateLogin'],
  data() {
    return {
       filterArticle: ''
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('access-token');
      this.updateLogin();
    },
  },
  watch: {
    filterArticle(val) {
      
      this.$emit('filterArticle', val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin-top: 0%;
    background-color: #E7F4EB;
    border-bottom: 1px solid;
  }

  .navbar, a {
    color: white !important;
    background-color: #313F51 !important;
  }

  button:hover {
    background-color: #22939A;
  }

</style>
