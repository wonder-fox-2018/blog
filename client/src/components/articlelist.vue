<template>
    <div class="col-md-8">
      
         <div class="container py-3" v-for="(value, index) in article" :key="index">
                <div class="card">
                    <div class="card-footer text-muted">
                        <h4 class="card-title">{{value.title}}</h4>
                    </div>
                <div class="row ">
                    <div class="col-md-4 col-12">
                        <img :src="value.img" width="200" height="200">
                    </div>
                    <div class="col-md-8 col-12 px-6">
                        <div class="card-block px-3">
                        <p class="card-text">Posted on {{value.createAt}}</p>
                        <p class="card-text">by {{value.username}}</p>
                        <button class="btn btn-primary"  @click="detailArticle(value._id)">Read More</button>
                        </div>
                    </div>

                    </div>
                </div>
        </div>
            <!-- Pagination -->
            <ul class="pagination justify-content-center mb-4">
                <li class="page-item">
                <a class="page-link" href="#">← Older</a>
                </li>
                <li class="page-item disabled">
                <a class="page-link" href="#">Newer →</a>
                </li>
            </ul>
    </div>
</template>

<script>
export default {
    props : ['article'],
    data() {
        return {
            
        }
    },
    methods: {
        detailArticle(articleId) {
            this.$router.push({
                name : 'detailArticle',
                params : {
                    id : articleId
                }
            })      
        },
    },
}
</script>

<style>
.card{
    width: 95%!important;
}
.col-md-4{
    width: 100%!important
}

</style>
