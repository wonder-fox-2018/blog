<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(article, index) in myarticle" :key="index">
            <!-- <img class="card-img-top" v-bind:src="article.picture" alt="Card image cap"> -->
            <div class="card-body">
                <h2 class="card-title">{{article.title}}</h2>
                <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p>
                <router-link :to="`/article/${article._id}`" class="btn btn-primary ml-2">Read </router-link> 
                <router-link :to="`/article/${article._id}`" class="btn btn-success ml-2">Edit </router-link>
                <router-link :to="`/article/${article._id}`" class="btn btn-danger ml-2">Delete </router-link>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + article.createdAt.slice(0, 10)"></div>
                <!-- by
                <a href="#">{{article.author.name}}</a> -->
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
    name : 'myarticle',
    data () {
        return {
            myarticle : ''
        }
    },
    methods : {
        getMyArticle(){
            let self = this

            axios({
                method : 'GET',
                url : `${config.port}/articles/`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((response)=>{
                self.myarticle = response.data.data
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getMyArticle()
    },
    mounted(){
        this.getMyArticle()
    }
}
</script>

<style>

</style>
