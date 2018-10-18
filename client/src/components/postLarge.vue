<template>
  <div id='postlarge'>
    <div v-if='showAll'>
      <router-link :to="{name: 'detail', params: {id: post._id}}" v-for='(post, index) in posts' :key='index'>
        <img class="card-img-top" :src="post.image">
        <div class="card-body">
          <h5 class="card-title border-bottom mb-4 pb-2"><strong>{{ post.title }}</strong></h5>
          <p class="card-text">{{ post.content }}</p>
        </div>
      </router-link>
    </div>
    <div v-else>
      <img class="card-img-top" :src="detail.image">
      <div class="card-body">
        <h4 class="card-title border-bottom mb-3 pb-2"><strong>{{ detail.title }}</strong></h4>
        <h5 style="margin-bottom: 75px">by {{ detail.author.name }}</h5>
        <p class="card-text">{{ detail.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlarge',
  props: ['posts'],
  data () {
    return {
      showAll: true,
      detail: {}
    }
  },
  methods: {
    getDetail (id) {
      axios({
        url: `http://localhost:3000/articles/${id}`
      })
        .then(data => {
          this.detail = data.data.data
          this.showAll = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    $route () {
      if (this.$route.params.id) {
        this.getDetail(this.$route.params.id)
      } else {
        this.showAll = true
        this.detail = {}
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    }
  }
}
</script>

<style>

</style>
