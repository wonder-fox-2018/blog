<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <div class="container">
                <a class="navbar-brand" href="#">Megalo-BLOG</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link">About</router-link>
                        </li>
                    </ul>
                    <div class="ml-auto my-2 my-lg-0">
                        <div class="section" id="b-section-navbar-search-form" name="Navbar: search form">
                            <div class="widget BlogSearch" data-version="2" id="BlogSearch1">
                                <form action="" class="form-inline">
                                    <input aria-label="Search this blog" class="form-control mr-sm-2" name="q"
                                        placeholder="Search this blog" type="text">
                                    <button class="btn btn-info my-2 my-sm-0">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
