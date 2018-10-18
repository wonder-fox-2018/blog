/* eslint-disable */
<template>
    <div class="col-lg-9">
        <div class="row">
        <div class="card w-40" style="margin: 20px 20px" v-for="(article, index) in articles" :key="index">
        <div class="card-body">
            <h5 class="card-title">Title: {{ article.title }} </h5>
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ article.author.first_name + ' ' + article.author.last_name }}</h6>
            <p class="card-text">Description: {{ article.description }}</p>
            <div class="card-footer bg-transparent">
                <div> <small>created at: {{ formatDate(article.createdAt) }}</small></div>
                <div> <small>updated at: {{ formatDate(article.updatedAt) }}</small></div>
                <span v-if=isLogin>
                    <a @click="doDelete(article._id,index)" href="#" class="card-link">Delete</a>
                    <a @click="doUpdate(article._id)" href="#" class="card-link" data-toggle="modal" data-target="#editTaskModal" >Update</a>
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
    props:['searchtxt','isLogin','dataArticle'],
    data(){
        return {
            articles:null
        }
    },
    methods:{
        formatDate(d) {
          let datetime=new Date(d)
          let date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()} `
          return date
        },
        refreshArticle(){
            console.log('child')
            let apptoken=localStorage.getItem('apptoken')
            if(apptoken){
                // this.$server.get(`/articles/byauthor`,{}, {
                //     headers: { apptoken: apptoken }
                // })
                this.$server({
                    url:  `/articles/byauthor`,
                    method: 'GET',
                    headers: {
                    apptoken: apptoken 
                    }
                })
                .then(({data}) => {
                    this.articles=data.articles
                })
                .catch((err) => {
                    console.log(err)
                });
            }
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
                });
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
