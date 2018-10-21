<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <a class="navbar-brand" href="#"> <img class="logo" src="http://icons-for-free.com/icon/download-backpack_organized_backpack_school_backpack_school_bag_icon-576279.png"
                height="40">  J O U R N E Y</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar1">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="http://bootstrap-ecommerce.com">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item"><a class="nav-link" href="html-components.html"> Documentation </a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link  dropdown-toggle" href="#" data-toggle="dropdown"> Dropdown </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"> Menu item 1</a></li>
                        <li><a class="dropdown-item" href="#"> Menu item 2 </a></li>
                    </ul>
                </li>
                <li class="nav-item" v-if='isLogin === false'>
                    <a class="btn ml-2 btn-info" @click="login()">Login</a>
                </li>
                <li class="nav-item" v-if='isLogin === true'>
                    <a class="btn ml-2 btn-info" @click="logout()">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLogin: false,
    };
  },
  methods : {
      login() {
          console.log('masuk ke menu login')
          this.isLogin = true
        //   this.$emit('is-login',isLogin)
      },
      logout(){
          console.log('masuk ke log out')
          this.isLogin = false
      }
  }
};
</script>
