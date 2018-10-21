<template>
    <div>
       <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">Blog Share</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
            </ul>
            <div v-if= "token === null || token === '' " >
               <button class="btn btn-info my-2 my-sm-0" data-toggle="modal" data-target="#loginModal" type="button">Login</button>
            </div>
            <div v-if= "token === null || token === '' ">
               <button class="btn btn-info my-2 my-sm-0" data-toggle="modal" data-target="#registerModal" type="button">Register</button>
            </div>
            <div v-if= "token !== null && token !== '' ">
               <button class="btn btn-info my-2 my-sm-0" v-on:click="logout()" type="button">Logout</button>
            </div>
        </div>
      </nav>

        <!--Modal Parts -->
        <!--Login Modal -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input v-model="entryemail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input v-model="entrypassword" type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="loginUser()">Login</button>
                </div>
                </div>
            </div>
        </div>

        <!--Register Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input v-model="entryname" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input v-model="entryemail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input v-model="entrypassword" type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="registerUser()">Register</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      entryname: '',
      entryemail: '',
      entrypassword: '',
      token: localStorage.getItem('blogtoken'),
      islogin: false,
      userbasicinfo: {},
      url: 'https://blogapi.efratsadeli.tech'
    }
  },
  methods: {
    getcredentials () {
      let self = this
      axios({
        method: 'GET',
        url: `${self.url}/users/credentials`,
        headers: {
          token: localStorage.getItem('blogtoken')
        }
      })
        .then(user => {
          self.userbasicinfo.userid = user.data.userid
          self.userbasicinfo.name = user.data.name
          self.userbasicinfo.email = user.data.email
          // console.log('Result Get Credential ', self.userbasicinfo)
          this.$emit('userbasicinfo', self.userbasicinfo)
        })
        .catch(error => {
          console.log('ERROR Get Credentials ', error)
        })
    },
    loginUser () {
      let self = this
      axios({
        method: 'POST',
        url: `${self.url}/user/login`,
        data: {
          email: self.entryemail,
          password: self.entrypassword
        }
      })
        .then(user => {
          self.token = user.data.token
          localStorage.setItem('blogtoken', self.token)
          this.$emit('token', self.token)
          self.entryemail = ''
          self.entrypassword = ''
          self.islogin = true
          this.$emit('islogin', self.islogin)
          self.getcredentials()
          this.$router.push({ name: 'home' })
          // eslint-disable-next-line
          $('#loginModal').modal('hide')
        })
        .catch(error => {
          self.entryemail = ''
          self.entrypassword = ''
          console.log('ERROR Login User----', error)
        })
    },
    registerUser () {
      console.log('REGISTER OK')
      let self = this
      axios({
        method: 'POST',
        url: `${self.url}/user/register`,
        data: {
          name: self.entryname,
          email: self.entryemail,
          password: self.entrypassword
        }
      })
        .then(user => {
          self.token = user.data.token
          localStorage.setItem('blogtoken', self.token)
          this.$emit('token', self.token)
          self.entryname = ''
          self.entryemail = ''
          self.entrypassword = ''
          self.islogin = true
          this.$emit('islogin', self.islogin)
          self.getcredentials()
          this.$router.push({ name: 'home' })
          // eslint-disable-next-line
          $('#registerModal').modal('hide')
        })
        .catch(error => {
          self.entryname = ''
          self.entryemail = ''
          self.entrypassword = ''
          console.log('ERROR Register User----', error)
        })
    },
    logout () {
      this.token = ''
      this.islogin = false
      this.userbasicinfo = {}
      this.$emit('token', this.token)
      this.$emit('islogin', this.islogin)
      this.$emit('userbasicinfo', this.userbasicinfo)
      localStorage.removeItem('blogtoken')
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    this.token = localStorage.getItem('blogtoken')
    if (this.token !== null || this.token !== '') {
      this.getcredentials()
    }
  },
  watch: {
    token (val) {
      if (val) {
        this.islogin = true
      }
    },
    userbasicinfo (val) {}
  }
}
</script>

<style>

</style>
