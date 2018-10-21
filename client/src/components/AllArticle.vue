<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(article, index) in allArticle.data" :key="index">
            <img class="card-img-top" v-bind:src="article.picture" alt="Card image cap">
            <div class="card-body">
                <h2 class="card-title">{{article.title}}</h2>
                <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p>
                <router-link :to="`/article/${article._id}`" class="btn btn-primary">Read More &rarr;</router-link>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + article.createdAt.slice(0, 10)"></div>
                by
                <a href="#">{{article.author.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
    name : 'AllArticle',
    data () {
        return {
            allArticle : ''
        }
    },
    methods : {
        getAllArticle() {
            let self = this

            axios({
                method : 'GET',
                url : `${config.port}/articles`
            })
            .then((response)=>{
                self.allArticle = response.data
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getAllArticle()
    }
}
</script>

<style>

</style>
