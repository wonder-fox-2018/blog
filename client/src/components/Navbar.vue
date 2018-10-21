<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">Start Bootstrap</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                <router-link to="/" class="nav-link" href="#">Home
                    <span class="sr-only">(current)</span>
                </router-link>
                </li>
                <li class="nav-item">
                <router-link :to="`/about`" class="nav-link" href="#">About</router-link>
                </li>
                <div class="dropdown">
                <a class="btn nav-link dropdown-toggle" href="#" v-if="islogin === true" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Blog
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <router-link :to="`/myprofile`" class="dropdown-item" href="">My Profile</router-link>
                    <router-link :to="`/myarticle`" class="dropdown-item" href="">My Article</router-link>
                    <router-link :to="`/create`" class="dropdown-item" href="">Post Article</router-link>
                </div>
                </div>
                <li class="nav-item" v-if="islogin === false" data-toggle="modal" data-target="#exampleModalCenter">
                <a class="nav-link" href="#">Login</a>
                </li>
                <li class="nav-item" v-if="islogin === true">
                <a class="nav-link" @click="signout()">Logout</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Email<br>
                    <input type="text" v-model="login_email"><br>
                    Password<br>
                    <input type="password" v-model="login_password">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="signin()">Login</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import config from '@/config.js'

export default {
    name: 'Navbar',
    data () {
        return {
            islogin : false,
            isadmin : false,
            login_email : '',
            login_password : '',

            triggerchange : ''
        }
    },
    mounted () {
        this.checkToken()
    },
    methods : {
        checkToken() {
            let token = localStorage.getItem('token')
            if(token){
                this.islogin = true
            }

            let admin = localStorage.getItem('admin')
            if(admin === true) {
                this.isadmin = true
            }
        },
        signin() {
            let email = this.login_email
            let password = this.login_password

            let data = {
                email,
                password
            }

            let self = this

            axios({
                method: "POST",
                url: `${config.port}/users/signin`,
                data
            })
            .then(function (response) {
                self.login_email = ''
                self.login_password = ''


                localStorage.setItem('token', response.data.token)
                localStorage.setItem('admin',response.data.isAdmin)

                if(response.data.isAdmin === true){
                    self.isadmin = true
                }
                self.islogin = true

                self.$emit('islogin-data',self.islogin)
                console.log(self.islogin)
                self.$emit('isadmin-data',self.isadmin)
                // console.log(this.isadmin)
            })
            .catch(function (err){
                self.failedLogin = true
                console.log(err)
            })
        },
        signout() {
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            this.islogin = false
            this.isadmin = false
            this.$emit('trigger-change',this.triggerchange)
            this.$emit('islogin-data',this.islogin)
            this.$emit('isadmin-data',this.isadmin)
        }
    }
}
</script>

<style>

</style>
