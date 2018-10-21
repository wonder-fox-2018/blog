<template>
    <div class="container">

      <div class="row">

        <!-- Post Content Column -->
        <div class="col-lg-8">

          <!-- Title -->
          <h1 class="mt-4">{{article.data.title}}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{article.data.author.name}}</a>
          </p>

          <hr>

          <!-- Date/Time -->
          <p v-html="'Posted on ' + article.data.createdAt.slice(0, 10)"></p>
            <!-- Posted on January 1, 2018 at 12:00 PM -->
          
          <hr>

          <!-- Preview Image -->
          <img class="img-fluid rounded" v-bind:src="article.data.picture" alt="">

          <hr>

          <!-- Post Content -->
          <p class="lead">{{article.data.content}}</p>

          <hr>

          <!-- Comments Form -->
          <div class="card my-4" v-if="commentform === true">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="card-body">
                <div class="form-group">
                  <textarea class="form-control" rows="3" v-model="inputcomment"></textarea>
                </div>
                <button class="btn btn-primary" v-on:click="submitComment()">Submit</button>
            </div>
          </div>

          <!-- Single Comment -->
          <div class="media mb-4" v-for="(comment, index) in comments" :key="index">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
              <h5 class="mt-0">{{comment.user.name}}</h5>
              {{comment.thecomment}}
            </div>
          </div>

          

        </div>

        <!-- Sidebar Widgets Column -->
        <sidebar></sidebar>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
</template>

<script>
import config from '@/config.js'
import Sidebar from '@/components/Sidebar.vue'

export default {
    name : 'completearticle',
    components : {
        Sidebar
    },
    data () {
        return {
            article : '',
            inputcomment : '',
            comments : '',
            triggerevent : '',
            token : localStorage.getItem('token'),
            commentform : false
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
                self.comments = self.article.data.comments
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        submitComment(){
            console.log('submit comment')

            let self = this
            
            axios({
                method : 'POST',
                url : `${config.port}/comments/${this.$route.params.articleId}`,
                headers : {
                    token : self.token
                },
                data : {
                    thecomment : self.inputcomment
                }
                })
                .then((response)=>{
                    self.inputcomment = ''
                    self.triggerevent = response
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        checkToken(){
            let token = localStorage.getItem('token')
            if(token){
                this.token = token
                this.commentform = true
            }

        }
    },
    created () {
        this.getArticle(this.$route.params.articleId)
        this.checkToken()
    },
    mounted (){
        this.checkToken()
    },
    watch : {
        triggerevent : function(val) {
            this.getArticle(this.$route.params.articleId)
        },
        token : function(val) {
            if(token === null){
                this.commentform = false
            }else{
                this.commentform = true
            }
        }
    }
}
</script>

<style>

</style>
