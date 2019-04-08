<template>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Login</h5>
                </div>
                <div class="modal-body">
                    <div v-if="loginAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Wrong username / password</strong>
                         <button type="button" class="close" @click=closeAlert()><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input v-model="loginInputEmail" type="email" class="form-control" id="loginInputEmail" placeholder="Enter email">
                            <small style="color: red">{{ MsgEmailLogin }}</small>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="loginInputPassword" type="password" class="form-control" placeholder="Password">
                            <small style="color: red">{{ MsgPasswordLogin }}</small>
                        </div>
                        <button default type="button" class="btn btn-primary btn-default" v-on:click="doLogin" style="margin-right: 10px">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'loginmodal',
  props: ['changeStatusLogin'],
  data () {
    return {
      loginAlert: false,
      loginInputEmail: '',
      loginInputPassword: '',
      MsgEmailLogin: '',
      MsgPasswordLogin: ''    
    }
  },
  methods: {  
    clearLogin(){
        this.loginInputEmail = ''
        this.loginInputPassword = ''
        this.MsgEmailLogin=''
        this.MsgPasswordLogin=''
    },
    doLogin() {
      this.$server.post(`/login`,{
        email: this.loginInputEmail, 
        password: this.loginInputPassword
        },{ headers: { apptoken: 'cobatoken' }})
      .then(({data}) => {
          console.log(data.user.id)
          if(data.apptoken){
            localStorage.setItem('apptoken', data.apptoken)
            this.$emit('parent-iduser',data.user.id)
            this.isLogin=true         
            this.clearLogin()
            this.changeStatusLogin()
            $('#loginModal').modal('hide');
            //this.isLogin = true
          }
      }).catch((err) => {
          this.loginAlert=true
          console.log(err)
      });
    },
    closeAlert(){
          this.loginAlert = false;
    }
  }
}
</script>
