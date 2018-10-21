<template>
    <div>
    <h3>halo dari article</h3>
    <p>{{ this.$route.params.articleId }}</p>
    <p>{{article.data.author.name}}</p>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
    name : 'completearticle',
    data () {
        return {
            article : ''
        }
    },
    methods : {
        getArticle(id){
            let self = this

            axios({
                method : 'GET',
                url : `${config.port}/articles/${id}`
            })
            .then((response)=>{
                console.log(response.data)
                self.article = response.data
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    created () {
        this.getArticle(this.$route.params.articleId)
        console.log('masuk ke created')
    }
}
</script>

<style>

</style>
