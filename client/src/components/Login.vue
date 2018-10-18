<template>
    <div class="col-lg-4 m-auto">
        <div class="card text-center card-form">
            <div class="card-body">
                <h3>Login</h3>
                <p>Please fill out this form to login</p>
                <form>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Email" autofocus>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Password">
                    </div>
                    <input type="submit" value="Login" class="btn btn-primary btn-block font-weight-bold">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>

</style>
