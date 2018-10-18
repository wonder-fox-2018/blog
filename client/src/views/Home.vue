<template>
    <div class="container">
        <div class="row">
            <!-- Blog Entries Column -->
            <div class="col-md-8">
                <h1 class="my-4">That Time I Got Reincarnated as a Slime
                    <!-- <small>転生したらスライムだった件</small> -->
                </h1>
                <!-- Blog Post -->
                <div class="card mb-4">
                    <img class="card-img-top" src="https://initiate.alphacoders.com/images/949/cropped-1366-768-949653.png?2690"
                        alt="Card image cap">
                    <div class="card-body">
                        <h2 class="card-title">Slime</h2>
                        <p class="card-text">"Rimuru Tempest" is the new name of a slime in a fantasy world taken by a
                            former 37-year-old human Satoru Mikami after he is killed by a passing robber.
                            Broken free from ordinary, stale past life, his fresh adventure in a fantasy world as a
                            slime monster
                            with unique abilities begins.
                        </p>
                        <a href="" class="btn btn-primary">Read More →</a>
                    </div>
                    <div class="card-footer text-muted">
                        Posted on October 17, 2018 by
                        <a href="#">Ainz Ooal Gown</a>
                    </div>
                </div>
            </div>
            <!-- Sidebar Widgets Column -->
            <div class="col-md-4">
                <!-- Search Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Search</h5>
                    <div class="card-body">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search for...">
                            <span class="input-group-btn">
                                <button class="btn btn-secondary" type="button">Go!</button>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Categories Widget -->
                <div class="card my-3">
                    <h5 class="card-header">Categories</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="#">Simba</a>
                                    </li>
                                    <li>
                                        <a href="#">Nyati</a>
                                    </li>
                                    <li>
                                        <a href="#">Faru</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-6">
                                <ul class="list-unstyled mb-0">
                                    <li>
                                        <a href="#">Kiboko</a>
                                    </li>
                                    <li>
                                        <a href="#">Fisi</a>
                                    </li>
                                    <li>
                                        <a href="#">Pundamlia</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Side Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Chat Room</h5>
                    <div class="card-body">
                        ............................
                    </div>
                </div>
                <!-- Side Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Banner</h5>
                    <div class="card-body">
                        <img class="card-img-top" src="https://avatarfiles.alphacoders.com/150/150078.png"
                            alt="Card image cap">
                    </div>
                </div>
                <!-- ANYTHING HERE -->
                <div class="card my-4">
                    <h5 class="card-header">Anything Here</h5>
                    <div class="card-body">
                        ................................
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
