<template>
  <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="email"  placeholder="Email">
              </div>
              <div class="form-group col-md-12">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password"  placeholder="Password">
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="inputUsername">Name</label>
              <input type="text" class="form-control" id="inputUsername" v-model="username"  placeholder="Username">
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="register">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email:'',
      password:'',
      username: ''
    }
  },
  methods : {
    register : function(){
      self = this
      console.log(self.email)
      axios({
        method : 'POST',
        url : 'http://localhost:3000/users/register',
        data : {
          email : self.email,
          password : self.password,
          username : self.username
        }
      })
      .then(response => {
        console.log(response)
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
