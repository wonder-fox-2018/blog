<template>
    <div class="container">
            <div class="float-md-right small text-muted">{{time.slice(0, 10)}}</div>
            <h2>{{title}}</h2>
            <h5>by. {{author}}</h5><br>
            <img :src="img">
            <br><br>
        <p>
            {{text}}
        </p>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'detailArticle' ,
        data(){
            return {
                server: 'http://localhost:3000',
                title: '',
                author: '',
                text: '',
                img: '',
                time: ''
            }
        },
        methods: {
            getArticle(id){
                axios({
                    method: 'GET',
                    url: `${this.server}/articles/${id}`
                })
                .then((result) => {
                    console.log(result.data);
                    this.text = result.data.text
                    this.title = result.data.title
                    this.author = result.data.author.name
                    this.img = result.data.img
                    this.time = result.data.createdAt
                    
                }).catch((err) => {
                    console.log(err);
                    
                });
            }
        },
        created() {
            // console.log(this.$route.params.id)
            this.getArticle(this.$route.params.id)

        },
        computed: {
            getParamsId: function() {
                return this.$route.params.id
            }
        },
        watch:{
            getParamsId: function(val){
                // this.idArticle = val
                // console.log(this.idArticle)
                this.getArticle(val)
            }
        }
    }
</script>
<style>
    img{
        max-width: 80%;
    }
</style>
