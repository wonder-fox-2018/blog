<template>
    <div>
        <div v-for="value in totalArticle">
            <h1 class="my-4">{{article.title}}</h1>
            <!-- Blog Post -->
            <div class="card mb-4">
                <img class="card-img-top" :src="article.img">
                <div class="card-body">
                    <h2 class="card-title">{{article.category}}</h2>
                    <p class="card-text">{{article.articleContent}}</p>
                    <!-- <a href="https://bootsnipp.com/fullscreen/6Xa15" class="btn btn-primary">Read More →</a> -->
                    <router-link class="btn btn-primary" to='/about'>Read More -></router-link>
                </div>
                <div class="card-footer text-muted">
                    Posted on {{article.date}} by
                    <a href="#">{{article.author}}</a>
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
            totalArticle : [1,2,3,4,5,6]
        }
    }
}
</script>

<style>

</style>
