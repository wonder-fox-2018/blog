<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">BlogTiv</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">home</router-link> |
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to= "/article/">about</router-link>
                    </li>
                    <li class="nav-item" v-if="isLogin">
                        <router-link class="nav-link" :to="{name : 'myList', params:{category : 'all'}}" >My Article</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
                <div class="ml-auto my-2 my-lg-0">
                    <div class="section" id="b-section-navbar-search-form" name="Navbar: search form">
                        <div class="widget BlogSearch" data-version="2" id="BlogSearch1">
                            <form action="" class="form-inline">
                                <button type="button" class="btn btn-success my-2 my-sm-0" v-if="!isLogin" data-toggle="modal" data-target="#modalRegister">Register</button>
                                <button type="button" class="btn btn-success my-2 my-sm-0" v-if="!isLogin" data-toggle="modal" data-target="#modalLogin">Login</button>
                                <button class="btn btn-success my-2 my-sm-0" type="button" @click="logout"  v-if="isLogin">Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name : 'navbar',
    props : ['isLogin', 'gettoken'],
    methods : {
        logout : function(){
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            this.gettoken()
            this.$router.push({
                name : 'home',
            })
        }
    }
}
</script>

<style>

</style>
