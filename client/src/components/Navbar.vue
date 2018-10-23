/* eslint-disable */
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Blog Kuliner</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link" href="#">Home
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <span v-if="isLogin" class="login" >
                        <button  class="btn btn-outline-primary mr-2 addtask" data-toggle="modal" data-target="#addTaskModal" type="button">Add Article</button>
                        <router-link to="/profile" type="button" class="btn btn-outline-primary mr-2 circle"> <i class="fas fa-user-circle" style="font-size:20px"></i></router-link>
                        <button class="btn btn-outline-primary logout" type="button" @click="doLogout">Logout</button>
                    </span>
                    <span v-if="!isLogin" class="notlogin">
                        <button  class="btn btn-outline-primary mr-2 login" data-toggle="modal" data-target="#loginModal" type="button">Login</button>
                        <button class="btn btn-outline-primary mr-2 register" data-toggle="modal" data-target="#registerModal" type="button">Register</button>
                    </span>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Navbar',
  props: ['isLogin','changetoLogout'],
  data () {
    return {
    }
  },
  methods: {
    doLogout(){
        this.changetoLogout();
    }
  },
  created() {
    console.log(this.isLogin)   
  }
}
</script>

