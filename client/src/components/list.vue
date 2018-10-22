<template>
    <div class="card my-4">
        <h5 class="card-header">List</h5>
        <div v-for="(value, index) in listArticle" :key="index">
            <a class="btn" @click="detailArticle(value._id)">{{value.title}}</a>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'
export default {
    data(){
        return {
            listArticle : [],
            show : false
        }
    },
    created : function(){
        this.getList()
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
        getList() {
            axios({
                method : 'GET',
                url : `${config.port}/articles/show`
            })
            .then(response => {
                this.listArticle = response.data
            })      
            .catch(err => {
                console.log(err)
            })
        },
    },
}
</script>

<style>

</style>
