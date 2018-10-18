<template>
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
</template>
<script>
export default {
  name: 'Sidebar',
};
</script>
