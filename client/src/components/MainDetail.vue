/* eslint-disable */
<template>
    <div class="col-lg-9">
        <div class="row">
        <div class="card w-400" style="margin: 20px 20px">
        <div class="card-body" v-if="article!==null">
            <img class="card-img-top mb-1" v-bind:src="article.imageurl" alt="Card image" style="width: 400px; height:400px">
            <h5 class="card-title">Title: {{ article.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ article.author.first_name + ' ' + article.author.last_name }}</h6>
            <p class="card-text">Description: {{ article.description }}</p>
            <div class="card-footer bg-transparent">
                <div> <small>created at: {{ formatDate(article.createdAt) }}</small></div>
                <div> <small>updated at: {{ formatDate(article.updatedAt) }}</small></div>
                <!-- <div> <small> {{ article.author._id + 'id user ' + iduser  }}</small></div> -->
                <span>
                     <a @click="doHome" href="#" class="card-link" >Home</a>
                </span>
             </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'maincontent',
    props:['searchtxt','isLogin','dataArticle','iduser','detailId'],
    data(){
        return {
            article:null
        }
    },
    methods:{
        doHome(){
            this.article=null
            this.$router.push(`/`)
        },
        formatDate(d) {
          let datetime=new Date(d)
          let date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()} `
          return date
        },
        refreshArticle(){
            this.$server({
                url:  '/articles/byid',
                method: 'POST',
                data:{
                    id: this.$route.params.id
                }
            })
            .then(({data}) => {
                this.article=data.article
            })
            .catch((err) => {
                console.log(err)
            });
            
        },
       
    },
    created() {
        if(this.$route.params.id!==null)
            this.refreshArticle()
        console.log('ini main detail created')
    },
    watch:{
        detailId(){
            console.log('ini main detailId watch')
            this.refreshArticle()
        },
        dataArticle(){
            //this.articles.push(this.dataArticle) //masalah jika push secara local, tidak ada populate firstname dan lastname
            this.refreshArticle()
            console.log('data article berubah')
        }
    }
}
</script>
