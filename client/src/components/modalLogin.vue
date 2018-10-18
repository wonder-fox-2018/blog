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
                <input type="email" class="form-control" id="inputEmailLogin"  placeholder="Email">
              </div>
              <div class="form-group col-md-12">
                <label for="inputPasswordLogin">Password</label>
                <input type="password" class="form-control" id="inputPasswordEmail"  placeholder="Password">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
