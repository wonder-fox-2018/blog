<template>
    <div>
        <!-- Button trigger modal -->
        <a class="btn" data-toggle="modal" data-target="#modal-login" v-if="!user"> Login / Register </a>
        <a class="btn" @click="logout" v-if="user"> Logout </a>
        <p v-if="user">Hi, {{user.name}}</p>

        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-login">Login</button> -->

        <!-- Modal login -->
        <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="loginPassword" placeholder="Password" required>
                        </div>
                        <button class="btn btn-primary" data-dismiss="modal"  v-on:click="login">Login</button>
                        <div class="form-group">
                            <br>
                            <label class="form-check-label">New User? <a class="btn form-check-label" data-dismiss="modal" data-toggle="modal" data-target="#modal-register">Register</a></label>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- register -->
        <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
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
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name"
                                v-model='registerName'>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="registerEmail" aria-describedby="emailHelp"
                                placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="registerPassword" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="register">Submit</button>
                    </div>
                    <div class="form-group">
                        <a class="btn form-check-label" data-dismiss="modal" data-toggle="modal" data-target="#modal-login">Back to login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'ModalLogin',
    props: ['setUser', 'user'],
    data() {
        return {
            server: 'http://localhost:3000',
            loginEmail: '',
            loginPassword : '',
            registerName: '',
            registerEmail: '',
            registerPassword : ''
        }
    },
    methods: {
        login(){            
            axios({
                method: 'POST',
                url: `${this.server}/users/login`,
                data: {
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            })
            .then((result) => {
                console.log(result.data.msg);
                localStorage.setItem('blogToken', result.data.token)
                this.loginEmail = '',
                this.loginPassword = ''
                this.setUser()
            }).catch((err) => {
                this.loginPassword = ''
                console.log(err.response.data.msg);
            });
        },
        register(){
            axios({
                method: 'POST',
                url: `${this.server}/users`,
                data: {
                    name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                }
            })
            .then((result) => {
                console.log(result);
                this.registerName = '',
                this.registerEmail = '',
                this.registerPassword = ''
            }).catch((err) => {
                // console.log(err.response.data.errors);
                this.registerPassword = ''
                console.log(err.response.data.message);
                
            });
        },
        logout(){
            localStorage.removeItem('blogToken')
            this.setUser()
            console.log('Logout berhasil');
            
        }

    }
}
</script>
