<template>
  <div id='postlarge'>
    <div v-if='showAll'>
      <div class="border mb-4" v-for='(post, index) in posts' :key='index'>
        <div v-if='post.author._id === authuser'>
          <div class="optBtn float-left">
            <button title="Edit Post" @click='editModal(post._id, post.title, post.content)'><i class="far fa-edit"></i></button>
            <button title="Delete Post" @click='deleteModal(post._id)'><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="optBtn float-right">
          <button title="Share with Twitter"><i class="fab fa-twitter"></i></button>
          <button title="Share with Facebook"><i class="fab fa-facebook"></i></button>
          <button title="Share with Google Plus"><i class="fab fa-google-plus"></i></button>
        </div>
        <router-link :to="{name: 'detail', params: {id: post._id}}">
          <img class="card-img-top" :src="post.image" style='height: 250px'>
          <div class="img-overlay"></div>
          <div class="card-body">
            <h5 class="card-title border-bottom mb-4 pb-2"><strong>{{ post.title }}</strong></h5>
            <p class="card-text">{{ post.content }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div v-if='detail.author._id === authuser'>
        <div class="optBtn float-left">
          <button title="Edit Post" @click='editModal(detail._id, detail.title, detail.content)'><i class="far fa-edit"></i></button>
          <button title="Delete Post" @click='deleteModal(detail._id)'><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      <div class="optBtn float-right">
        <button title="Share with Twitter"><i class="fab fa-twitter"></i></button>
        <button title="Share with Facebook"><i class="fab fa-facebook"></i></button>
        <button title="Share with Google Plus"><i class="fab fa-google-plus"></i></button>
      </div>
      <img class="card-img-top" :src="detail.image" style='height: 250px'>
      <div class="img-overlay"></div>
      <div class="card-body">
        <h4 class="card-title border-bottom mb-3 pb-2"><strong>{{ detail.title }}</strong></h4>
        <h5 style="margin-bottom: 75px">by {{ detail.author.name }}</h5>
        <p class="card-text">{{ detail.content }}</p>
      </div>
      <div v-if="signedin" class="text-left" id='comment'>
        <h5>Add your comments here . . .</h5>
        <textarea rows="2" placeholder="Comment" onfocus='this.placeholder = ""' onblur='this.placeholder = "Comment"'></textarea>
        <div class="text-center">
          <button>+ New Comment</button>
        </div>
      </div>
    </div>
    <!-- MODALS -->
      <!-- BACKDROP -->
      <div id='optBackdrop' v-if='optBackdrop'></div>
      <!-- EDIT MODAL -->
      <div id='editModal' v-if='openEditModal'>
        <button @click='editModal' class="float-right" style="margin: -25px -25px 0 0; padding: 0; border: 0; background: transparent; color: #42b983"><i class="far fa-times-circle"></i></button>
        <input type="text" v-model='title' placeholder="Title"><br>
        <textarea v-model='content' placeholder="Content" rows="10"></textarea><br>
        <div v-if='notice.length > 0' style='color: #42b983'>{{ notice }}</div>
        <div v-else style='color: transparent'>placeholder</div>
        <button @click='editModal'>Argh, no, it's perfect!</button>
        <button @click='editPost'>Edit Post</button>
      </div>
      <!-- DELETE MODAL -->
      <div id='deleteModal' v-if='openDeleteModal'>
        <button @click='deleteModal' class="float-right" style="margin: -25px -25px 0 0; padding: 0; border: 0; background: transparent; color: #42b983"><i class="far fa-times-circle"></i></button>
        <h2>Are you sure<span>?</span></h2><br>
        <h5>The post will be permanently deleted after this</h5><br>
        <button @click='deleteModal'>No, sorry, that was a mistake</button>
        <button @click='deletePost'>Yeah, get rid of this shit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlarge',
  props: ['posts', 'authuser', 'signedin'],
  data () {
    return {
      showAll: true,
      detail: {},
      title: '',
      content: '',
      notice: '',
      optBackdrop: false,
      openEditModal: false,
      openDeleteModal: false,
      editId: '',
      deleteId: ''
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
    },
    editModal (id, title, content) {
      this.openEditModal = !this.openEditModal
      this.optBackdrop = !this.optBackdrop
      if (id && title && content) {
        this.editId = id
        this.title = title
        this.content = content
      } else {
        this.editId = ''
        this.title = ''
        this.content = ''
      }
    },
    deleteModal (id) {
      this.openDeleteModal = !this.openDeleteModal
      this.optBackdrop = !this.optBackdrop
      if (id) {
        this.deleteId = id
      } else {
        this.deleteId = ''
      }
    },
    editPost () {
      axios({
        url: `http://localhost:3000/articles/${this.editId}`,
        method: 'put',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          content: this.content
        }
      })
        .then(() => {
          this.editModal()
          if (this.$route.params.id) {
            this.getDetail(this.$route.params.id)
          } else {
            this.$emit('reload')
          }
        })
        .catch(err => {
          this.notice = err.response.data.message
        })
    },
    deletePost () {
      axios({
        url: `http://localhost:3000/articles/${this.deleteId}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          this.deleteModal()
          this.$emit('reload')
          this.$router.push('/')
        })
        .catch(err => {
          this.notice = err.response.data.message
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
