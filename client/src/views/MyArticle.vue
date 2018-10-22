<template>
    <!-- Blog Post -->
    <div>
        <div class="card mb-4" v-for="(article, index) in myarticle" :key="index">
            <!-- <img class="card-img-top" v-bind:src="article.picture" alt="Card image cap"> -->
            <div class="card-body">
                <h2 class="card-title">{{article.title}}</h2>
                <p class="card-text" v-html="article.content.slice(0, 150) + ' ...'"></p>
                <router-link :to="`/article/${article._id}`" class="btn btn-primary ml-2">Read </router-link>
                <router-link :to="`/edit/${article._id}`" class="btn btn-success ml-2">Edit </router-link>
                <button @click="deleteArticle(article._id)" class="btn btn-danger ml-2">Delete </button>
            </div>
            <div class="card-footer text-muted">
                <div v-html="'Posted on ' + article.createdAt.slice(0, 10)"></div>
                <!-- by
                <a href="#">{{article.author.name}}</a> -->
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'myarticle',
  props: ['islogin'],
  data () {
    return {
      myarticle: '',
      triggerChange: ''
    }
  },
  methods: {
    getMyArticle () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles/my`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          self.myarticle = response.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteArticle (id) {
      let self = this

      axios({
        method: 'DELETE',
        url: `${config.port}/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          self.triggerChange = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    }
  },
  created () {

  },
  mounted () {
    this.getMyArticle()
    this.checkToken()
  },
  watch: {
    triggerChange: function (val) {
      this.getMyArticle()
    },
    islogin: function (val) {
      this.checkToken()
    }
  }

}
</script>

<style>

</style>
