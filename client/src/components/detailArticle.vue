<template>
  <div class="ui ten wide column">
    <div class="ui fluid card">
      <div class="ui image">
        <img :src="article.imgHeader" style="object-fit: contain;width: 100%; height:140px">
      </div>
      <div class="content" style="text-align: center">
        <a class="header">{{ article.title }}</a>
        <div class="meta">
          <span class="date">Created in {{ new Date(article.createdAt).getDate() }} - {{ new Date(article.createdAt).getMonth() + 1 }} - {{ new Date(article.createdAt).getFullYear() }}</span>
        </div>
      </div>
      <div class="description" style="padding:20px;">
        {{article.description}}
      </div>
      <div class="extra content" v-if="article.userId._id === userDetail.id">
        <button class="ui mini right floated button" @click="$router.push({ path: '/article/'+article._id+'/update' })">Edit</button>
        <button class="ui mini right floated button" @click="removeArticle">Remove</button>
      </div>
    </div>
    <div class="ui segment">
      <div class="content">
        <div class="ui dividing header">
          {{article.commentId.length}} Comments
        </div>
      </div>
      <div class="ui celled list" v-for="comment in article.commentId">
        <div class="item">
          <img class="ui avatar image" :src="comment.userId.avatar">
          <div class="content">
            <div class="header">{{comment.userId.fname}}</div>
            {{comment.body}}
          </div>
          <button class="ui mini right floated button" @click="removeComment(article._id,comment._id)" v-if="comment.userId._id === userDetail.id">delete</button>
        </div>
      </div>
    </div>
      <div class="ui segment form" v-if="userDetail.id !== ''">
        <div class="field">
          <label> Create a comment :</label>
          <textarea rows="3" v-model="commentInput"></textarea>
        </div>
        <div class="field">
          <button class="ui mini fluid button" @click="createComment">Submit</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'detail-article',
  props: ['currentUser', 'loadNewData'],
  data() {
    return {
      paramId: this.$router.history.current.params.id,
      userDetail: {
        avatar: '',
        fname: '',
        id: ''
      },
      commentInput: '',
      article: {
        _id: '',
        userId: {
          _id: ''
        },
        commentId: [],
        categoryId: {
          name: ''
        }
      }
    }
  },
  created() {
    let id = this.$router.history.current.params.id
    this.getDetailArticle(id)
    this.changeUserDetail()
  },
  watch: {
    paramId() {
      this.getDetailArticle(this.paramId)
    },
    loadNewData() {
      if (this.loadNewData) {
        this.getDetailArticle(this.$router.history.current.params.id)
      }
    },
    currentUser: {
      handler() {
        if (!this.currentUser) {
          this.userDetail = {
            avatar: '',
            fname: '',
            id: ''
          }
        } else {
          this.userDetail = this.currentUser
        }
      },
      deep: true
    }
  },
  methods: {
    changeUserDetail() {
      if (!this.currentUser) {
        this.userDetail = {
          avatar: '',
          fname: '',
          id: ''
        }
      } else {
        this.userDetail = this.currentUser
      }
    },
    removeComment(idArticle, idComment) {
      axios({
        url: host + '/comment/' + idArticle + '/' + idComment,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.getDetailArticle(this.article._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeArticle() {
      axios({
        url: host + '/article/' + this.article._id,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$emit('reload-data')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    createComment() {
      axios({
        url: host + '/comment/' + this.article._id,
        method: 'post',
        data: {
          body: this.commentInput
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$emit('reload-data')
          this.getDetailArticle(this.article._id)
          this.commentInput = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailArticle(id) {
      axios({
        url: host + '/article/' + id,
        method: 'get'
      })
        .then(data => {
          this.article = data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
