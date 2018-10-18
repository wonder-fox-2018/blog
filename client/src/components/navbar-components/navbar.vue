<template>
<div class="flex-column">
  <div class="jumbotron jumbotron-fluid header">
    <div class="container">
      <h1 class="display-2">Echo</h1>
      <p class="lead">share your mind here</p>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" v-if="isLogin">Hello</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" v-if="!isLogin">
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
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
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
  methods: {
    logOut() {
      localStorage.removeItem('access-token');
      this.updateLogin();
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    margin-bottom: 0%;
  }

  .navbar {
    margin-bottom: 3%;
  }

</style>
