<template>
  <div class="card mb-4" v-if="show">
    <div class="card-footer text-muted">
      Posted on {{detail.createAt}} by
      <a href="#">{{detail.username}}</a>
    </div>
    <img class="card-img-top" :src="detail.img">
    <h3>{{detail.title}}</h3>
    <div class="card-body">
        <h2 class="card-title">{{detail.category}}</h2>
        <p class="card-text" v-html="detail.article"></p>
    </div>
    <div class="card-footer text-muted">
    <div class="col-sm-12">
        <div class="panel panel-white post panel-shadow">
            <div class="post-footer">
                <div class="input-group"> 
                    <input class="form-control" v-model="comment" placeholder="Add a comment" type="text">
                    <span class="input-group-addon">
                       <button class="btn btn-primary" @click="addComment">add comment</button> 
                    </span>
                </div>
                <div class="border">
                  <ul class="comments-list" v-for="(list,index) in detail.comments" :key="index">
                      <li class="comment border">
                        <div class="comment-body">
                            <div class="comment-heading">
                                <h4 class="user">{{list.user}}</h4>
                            </div>
                            <p>{{list.comment}}</p>
                        </div>
                        <div class="d-flex">
                          <div v-if="username != list.user && username != ''">
                          </div>
                            <button v-if="username == list.user && username != ''" @click="deleteComment(list._id)" class="ml-auto" data-toggle='modal' data-target='#editComment'>Delete</button>
                        </div>
                    </li>
                </ul>
                  </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
    data(){
      return{
        detail : '',
        show : true, 
        comment : '',
        username : ''
      }
    },
    props : ['id'],
    created : function(){
      this.getDetailArticle()
      this.username = localStorage.getItem('username')
    },
    watch : {
      id(){
        this.getDetailArticle()
      }
    },
    methods: {
      deleteComment : function(value){
        console.log(value)
        axios({
          method : 'DELETE',
          url : `${config.port}/comments/delete/${value}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
      },
      addComment : function(){
        axios({
          method : 'POST',
          url : `${config.port}/comments/add`,
          headers : {
            token : localStorage.getItem('token'),
          },
          data : {
            comment : this.comment,
            articleId : this.id
          }
        })
        .then(response => {
          this.getDetailArticle()
          this.username = localStorage.getItem('username')
        })
        .catch(err => {
          console.log(err)
        })
      },
      getDetailArticle() {
        // self = this
        axios({
          method : 'GET',
          url : `${config.port}/articles/show/${this.id}`
        })
        .then(response => {
          this.detail = response.data.article
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
}
</script>

