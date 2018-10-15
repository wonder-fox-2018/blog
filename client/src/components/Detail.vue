<template>
  <div>
    <div class="card mb-4 my-5 mx-5 px-3">

      <div class="card-body" v-if="isLoad">
        <h2 class="card-title text-center display-4">{{ this.article.title }}</h2>
        <p class="card-text">{{ this.article.content }}</p>
      </div>
      <div class="card-footer text-muted mb-5" v-if="isLoad">
        Posted on {{ this.created }} by {{ this.name }}
      </div>

      <div class="my-3" v-if="datalocal && isLoad">
        <div class="form-group row">
          <div class="col-lg-5">
            <textarea class="form-control" rows="2" placeholder="Comment........." v-model="comment"></textarea>
            <br>
            <button type="button" class="btn btn-primary" @click="addComment">Comment</button>
          </div>
        </div>
      </div>

      <div class="card-footer text-muted mb-4" v-for="comment in article.comments" :key="comment._id" v-if="isLoad">
        <h6>{{ comment.userId.name }}: </h6>
        <p>{{ comment.comment }}</p>
        <button type="button" class="btn btn-xs btn-danger" @click="deleteComment(comment._id)" v-if="comment.isHim"><i class="fa fa-trash fa-sm"/></button>
      </div>

      <div class="loader text-center" v-if="!isLoad"></div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'detail',
  props: ['id', 'datalocal', 'newarticle'],
  data: function () {
    return {
      article: {},
      name: '',
      created: '',
      comment: '',
      isLoad: false
    }
  },
  methods: {
    addComment () {
      let self = this

      axios({
        method: 'post',
        url: `http://api.blog.skinborderevent.ml/comment/${this.article._id}`,
        headers: {
          token: this.datalocal.token
        },
        data: {
          comment: this.comment
        }
      })
        .then(response => {
          response.data['isHim'] = true
          self.article.comments.push(response.data)
          self.comment = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment (commentId) {
      let self = this
      let indexComment

      this.article.comments.forEach((comment, index) => {
        if (comment._id === commentId) {
          indexComment = index
        }
      })

      axios({
        method: 'delete',
        url: `http://api.blog.skinborderevent.ml/comment/${commentId}`,
        headers: {
          token: this.datalocal.token
        },
        data: {
          articleId: this.article._id
        }
      })
        .then(() => {
          self.article.comments.splice(indexComment, 1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: `http://api.blog.skinborderevent.ml/articles/${this.id}`
    })
      .then(response => {
        response.data.comments.forEach(comment => {
          if (comment.userId.email === self.datalocal.email) {
            comment['isHim'] = true
          } else {
            comment['isHim'] = false
          }
        })

        self.created = new Date(response.data.createdAt).toLocaleDateString()
        self.name = response.data.userId.name
        self.article = response.data
        self.isLoad = true
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    id: function () {
      let self = this

      axios({
        method: 'get',
        url: `http://api.blog.skinborderevent.ml/articles/${this.id}`
      })
        .then(response => {
          self.created = new Date(response.data.createdAt).toLocaleDateString()
          self.name = response.data.userId.name
          self.article = response.data
          self.isLoad = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    newarticle: function () {
      this.article = this.newarticle
    }
  }
}
</script>

<style>
  .sidebar-title {
    font-size: 1.5rem;
  }

  .loader {
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>
