<template>
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmailLogin">Email</label>
                <input type="email" class="form-control" id="inputEmailLogin" v-model="email" placeholder="Email">
              </div>
              <div class="form-group col-md-12">
                <label for="inputPasswordLogin">Password</label>
                <input type="password" class="form-control" id="inputPasswordLogin" v-model="password"  placeholder="Password">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="login" data-dismiss="modal">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['gettoken'],
  data(){
    return{
      email : '',
      password : ''
    }
  },
  methods : {
    login : function(){
      self = this
      axios({
        method : 'POST',
        url : 'http://localhost:3000/users/login',
        data :{
          email : self.email,
          password : self.password
        }
      })
      .then(response => {
        this.email = ''
        this.password = ''
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.gettoken()
        this.$router.push({
          name : 'home'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
