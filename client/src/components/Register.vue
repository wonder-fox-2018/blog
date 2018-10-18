<template>
    <div class="col-lg-4 m-auto">
        <div class="card text-center card-form">
            <div class="card-body">
                <h3>Register</h3>
                <p>Please fill out this form to register</p>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Name" autofocus>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Password">
						<small id="passwordHelpBlock" class="form-text text-muted text-left">
							Your password must be 4-10 characters long.
						</small>
                    </div>
                    <input type="submit" value="Register" class="btn btn-danger btn-block font-weight-bold">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style>

</style>
