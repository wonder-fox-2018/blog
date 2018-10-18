<template>
    <div id="app">
        <div class="container" v-if="!isLogin">
            <div class="d-flex flex-column justify-content-center align-items-center mt-5 mb-2">
                <h1 class="display-2 mb-4 mt-4">
                    Blog<i class="fas fa-dungeon"></i>te
                </h1>
                <h3 class="lead">Write
                    <strong>your unique stories</strong>
                </h3>
                <h3 class="lead mb-4">
                    and share it with the
                    <strong>world!</strong>
                </h3>
                <div class="mb-2 d-flex col-4 justify-content-between" id="nav">
                    <router-link id="nav-link-btn" to="/">Register</router-link> |
                    <router-link id="nav-link-btn" to="/login">Login</router-link>
                </div>
                <router-view/>
            </div>
        </div>
        <div v-if="isLogin">
            <nav class="navbar navbar-expand-sm navbar-dark mb-5" id="top-nav">
                <div class="container">
                    <a id="home-nav" class="navbar-brand font-weight-bold text-white">
                        Blog<i class="fas fa-dungeon"></i>te
                    </a>
                    <button class="navbar-toggler" data-toggle="collapse" data-target="div-main-nav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="div-main-nav">
                        <ul class="navbar-nav font-weight-bold ml-auto" id="main-nav">
                            <li class="nav-item dropdown mr-2">
                                <a class="nav-link">
                                    <i class="far fa-paper-plane mr-1"></i>
                                    Articles
                                </a>
                            </li>
                            <li class="nav-item mr-2">
                                <a class="nav-link">
                                    <i class="fas fa-bell mr-1"></i>
                                    Notifications
                                    <span v-if="getNotif" class="badge badge-dark px-2 py-1">{{ notifBadge }}</span>
                                </a>
                            </li>
                            <li v-on:click="showProfile" class="nav-item mr-2">
                                <a role="button" class="nav-link">
                                    <i class="fas fa-user-ninja"></i>
                                    Profile
                                </a>
                            </li>
                            <li class="nav-item d-flex align-items-center">
                                <form class="form-inline mr-2">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="fas fa-search"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control mr-3" placeholder="Search Articles" id="search-nav">
                                    </div>
                                    <button class="btn btn-outline-light">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column justify-content-start">
                                    <ul class="navbar-nav">
                                        <li class="nav-item container">
                                            <a class="nav-link text-left">Article 1</a>
                                        </li>
                                        <li class="nav-item container">
                                            <a class="nav-link text-left">Article 2</a>
                                        </li>
                                        <li class="nav-item container">
                                            <a class="nav-link text-left">Article 3</a>
                                        </li>
                                        <li class="nav-item container">
                                            <a class="nav-link text-left">Article 4</a>
                                        </li>
                                        <li class="nav-item container">
                                            <a class="nav-link text-left">Article 5</a>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9" v-if="listShow">
                        <div class="card-columns">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <img class="card-img-top img-fluid" src="https://i.pinimg.com/564x/b9/84/cc/b984ccccdc93785f7a6de88dd3181a80.jpg" alt="">
                                <div class="card-body">
                                    <h4 class="card-title">Card Title</h4>
                                    <p class="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas...</p>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="font-weight-bold ml-5">By Mr.X</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                    <button class="btn btn-block font-weight-bold" id="btn-post">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9" v-if="!listShow">
                        <div class="card">
                            <img class="card-img-top img-fluid" src="https://i.pinimg.com/564x/b9/84/cc/b984ccccdc93785f7a6de88dd3181a80.jpg" alt="">
                            <div class="card-body">
                                <h4 class="card-title">Card Title</h4>
                                <p class="card-text text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum excepturi minima culpa expedita, tenetur eaque rem nihil doloremque repellat blanditiis odio aliquam voluptatum maxime iusto doloribus asperiores porro. Cum beatae dolore quos quaerat, dignissimos pariatur aliquid quod soluta earum sunt, optio eum reiciendis, officiis blanditiis ducimus ad provident exercitationem totam?</p>
                                <p class="card-text text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores impedit voluptate voluptatibus quisquam praesentium rerum sint molestiae dolore cupiditate, tempore veritatis sit eius architecto. Unde, assumenda earum rerum pariatur quidem consectetur sit excepturi optio delectus nihil? Natus labore quos accusantium deleniti ducimus quod voluptatibus, voluptas impedit praesentium quisquam. Esse aliquid id autem dolorem quisquam perferendis consectetur possimus, totam quasi consequatur fuga repudiandae laborum aspernatur cupiditate? Excepturi incidunt nemo iste distinctio iusto dicta enim blanditiis consequuntur amet dolor suscipit magni officia, labore expedita quidem eligendi dignissimos quam ullam nam ducimus laborum nostrum molestiae minima. Doloremque, perferendis incidunt! Iste beatae veniam obcaecati!</p>
                                <p class="card-text mb-4 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere veniam doloribus cupiditate maxime soluta atque similique commodi aperiam et! Ducimus ut architecto sequi beatae voluptate iure dolorum debitis error provident...</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="font-weight-bold ml-5">By Mr.X</div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="font-weight-bold mr-3">Comments</div>
                                        <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      isLogin: true,
      getNotif: false,
      notifBadge: 2,
      listShow: false
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    width: 150px;
    padding: 10px;
}

#top-nav {
    background-color: #133337 !important;
}

#home-nav {
    font-family: Oswald;
    font-size: 30px;
}

#search-nav {
    border-color: #cccccc;
    -webkit-box-shadow: none;
    box-shadow: none;
}

#main-nav {
    font-family: Lato;
    font-size: 18px;
}

#nav-link-btn {
    /* background-color: #11a29a; */
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#comment-symbol {
    font-size: 20px;
}

@media (min-width: 34em) {
    .card-columns {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
}

#btn-post:hover {
    background-color: #ffa500;
    color: white;
}

#btn-post {
    background-color: #133337;
    color: white;
}

#span-comment {
    font-size: 18px;
}
</style>
