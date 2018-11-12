<template>
  <div class="ui three wide column">
    <div class="ui card">
      <div class="image content">
        <img :src="currentUser.avatar">
      </div>
      <div class="ui form">
        <div class="field">
          <label style="text-align:center">change avatar</label>
          <input type="file" @change="uploadAva">
        </div>
      </div>
      <div class="content" style="text-align: center">
        <div class="meta">Login as:</div>
        <div class="header">{{ currentUser.fname }}</div>
      </div>
    </div>
    <div class="ui fluid icon button" @click="$router.push({ path: '/create' })">
      <i class="plus icon"></i>
      Create new article
    </div>
    <div class="ui segment">
      <h3 class="ui dividing header" style="text-align: center">My article</h3>
      <div class="ui middle aligned divided list">
        <div class="item" v-for="article in myArticles">
          <div class="content" style="text-align:center">
            <a @click="toDetail(article._id)">{{ article.title.slice(0,25) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'
import imageResize from 'browser-image-resizer'

const { host, setupSize } = config

export default {
  name: 'userInfo',
  props: ['currentUser', 'loadNewData'],
  data() {
    return {
      myArticles: []
    }
  },
  created() {
    this.getMyArticle()
  },
  watch: {
    loadNewData() {
      if (this.loadNewData) {
        this.getMyArticle()
      }
    }
  },
  methods: {
    toDetail(id) {
      this.$emit('reload-data')
      this.$router.push({ path: '/article/' + id })
    },
    uploadAva(val) {
      imageResize(val.target.files[0], setupSize).then(resizedImage => {
        const formData = new FormData()
        formData.append('image', resizedImage)
        axios
          .post(host + '/users/avatar', formData, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(data => {
            this.$emit('get-user')
            this.$emit('reload-data')
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    getMyArticle() {
      let token = localStorage.getItem('token')
      axios({
        url: host + '/article/me',
        method: 'get',
        headers: {
          token: token
        }
      })
        .then(data => {
          this.myArticles = data.data.data
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
