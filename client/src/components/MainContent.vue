/* eslint-disable */
<template>
    <div class="col-lg-9">
        <div class="row">
        <div class="card w-40" style="margin: 20px 20px" v-for="(article, index) in articles" :key="index">
        <div class="card-body">
            <img class="card-img-top mb-1" v-bind:src="article.imageurl" alt="Card image" style="width: 200px; height:200px">
            <h5 class="card-title">Title: {{ article.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ article.author.first_name + ' ' + article.author.last_name }}</h6>
            <p class="card-text">Description: {{ article.description }}</p>
            <div class="card-footer bg-transparent">
                <div> <small>created at: {{ formatDate(article.createdAt) }}</small></div>
                <div> <small>updated at: {{ formatDate(article.updatedAt) }}</small></div>
                <!-- <div> <small> {{ article.author._id + 'id user ' + iduser  }}</small></div> -->
                <span v-if="isLogin && iduser==article.author._id">
                    <a @click="doDelete(article._id,index)" href="#" class="card-link">Delete</a>
                    <a @click="doUpdate(article._id)" href="#" class="card-link" data-toggle="modal" data-target="#editTaskModal" >Update </a>
                </span>
                <span> <a @click="doDetail(article._id)" href="#" class="card-link" > ReadMore</a></span>
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
    props:['searchtxt','isLogin','dataArticle','iduser'],
    data(){
        return {
            articles:null,
        }
    },
    methods:{
        doDetail(idArticle){
            this.$emit('parent-detail',idArticle)
            this.$router.push(`/detail/${idArticle}`)
        },
        formatDate(d) {
          let datetime=new Date(d)
          let date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()} `
          return date
        },
        refreshArticle(){
            // this.$server.get(`/articles/byauthor`,{}, {
            //     headers: { apptoken: apptoken }
            // })
            this.$server({
                url:  `/articles`,
                method: 'GET'
            })
            .then(({data}) => {
                this.articles=data.articles
            })
            .catch((err) => {
                console.log(err)
            });
            
        },
        doDelete(idArticle,index){
             let apptoken=localStorage.getItem('apptoken')
            if(apptoken){
                this.$server({
                    url:  `/articles/`,
                    method: 'DELETE',
                    data:{
                        articleid:idArticle
                    },
                    headers: {
                    apptoken: apptoken 
                    }
                })
                .then(({data}) => {
                    this.articles.splice(index,1)
                })
                .catch((err) => {
                    console.log(err)
                });
            }
        },
        doUpdate(idArticle){
            this.$emit('parent-edit-task',idArticle)
        }
    },
    created() {
        this.refreshArticle()
    },
    watch:{
        searchtxt(){
            let apptoken=localStorage.getItem('apptoken')
            if(apptoken){
                if(this.searchtxt=='')
                    this.refreshArticle()
                else{
                this.$server({
                    url:  `/articles/search`,
                    method: 'POST',
                    data:{
                        search:this.searchtxt
                    },
                    headers: {
                    apptoken: apptoken 
                    }
                })
                .then(({data}) => {
                    this.articles=data.articles
                })
                .catch((err) => {
                    console.log(err)
                });}
            }
        },
        dataArticle(){
            //this.articles.push(this.dataArticle) //masalah jika push secara local, tidak ada populate firstname dan lastname
            this.refreshArticle()
            console.log('data article berubah')
        }
    }
}
</script>
