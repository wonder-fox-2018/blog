<template>
  <div id='postlist'>
    <button id='addBtn' v-if='signedin' @click='addModal'>+ New Post</button>
    <div id='aPLink' class="border-bottom pb-2"><router-link to='/'>All Posts</router-link></div><br>
    <router-link :to='{name: "detail", params: {id: post._id}}' v-for='(post, index) in posts' :key='index'>{{ post.title }}<br></router-link>
    <!-- ADD MODAL -->
    <div id='addBackdrop' v-if='openAddModal'></div>
    <div id='addModal' v-if='openAddModal'>
      <button @click='addModal' class="float-right" style="margin: -25px -25px 0 0; padding: 0; border: 0; background: transparent; color: #42b983"><i class="far fa-times-circle"></i></button>
      <input type="text" v-model='title' placeholder="Title"><br>
      <textarea v-model='content' placeholder="Content" rows="10"></textarea><br>
      <div v-if='notice.length > 0' style='color: #42b983'>{{ notice }}</div>
      <div v-else style='color: transparent'>placeholder</div>
      <button @click='addModal'>Maybe Later</button>
      <button @click='addPost'>+ Add Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlist',
  props: ['signedin'],
  data () {
    return {
      posts: [],
      openAddModal: false,
      title: '',
      content: '',
      notice: ''
    }
  },
  methods: {
    getPosts () {
      axios({
        url: 'http://localhost:3000/articles'
      })
        .then(data => {
          this.posts = data.data.data
          this.$emit('posts', data.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addModal () {
      this.openAddModal = !this.openAddModal
    },
    addPost () {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          content: this.content
        }
      })
        .then(() => {
          this.addModal()
          this.getPosts()
        })
        .catch(err => {
          this.notice = err.response.data.message
        })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>

<style>

</style>
