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
            <p class="card-text">{{ post.content | contentSlice }}</p>
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
      <div class="card-body detail-body">
        <h4 class="card-title border-bottom mb-3 pb-2"><strong>{{ detail.title }}</strong></h4>
        <h5>written by <b>{{ detail.author.name }}</b></h5>
        <h6 v-if='detail.location.length > 0'  style="margin-bottom: 75px">in <span class='writeLoc' @click='geocode'><b>{{ detail.location }}</b></span></h6>
        <h6 v-else style="margin-bottom: 75px" class="placeholder">placeholder</h6>
        <p class="card-text">{{ detail.content }}</p>
      </div>
      <div v-if="signedin" class="text-left" id='comment'>
        <h5>Add your comments here . . .</h5>
        <textarea rows="2" placeholder="Comment" onfocus='this.placeholder = ""' onblur='this.placeholder = "Comment"' v-model='comment'></textarea>
        <div class="text-center">
          <div v-if='commentNotice.length > 0' style='color: #42b983'>{{ commentNotice }}</div>
          <div v-else class="placeholder">placeholder</div>
          <button @click='addComment(detail._id)'>+ New Comment</button>
        </div>
      </div>
      <div class="comments border-top pt-4 mt-4">
        <div class="row pb-2 mb-4 border-bottom" v-for='(comment, index) in detail.comments' :key='index'>
          <div class="col-11 text-justify">
            <div class="commenter">
              <b>{{ comment.commenter.name }}</b> commented on {{ comment.createdAt.slice(0, 10) }}
            </div>
            <h6>{{ comment.words }}</h6>
          </div>
          <div class="col-1" v-if='comment.commenter._id === authuser'>
            <button class='comDelBtn' @click='deleteCommentModal(comment._id)'><i class="far fa-trash-alt"></i></button>
          </div>
          <div class="col-1" v-else></div>
          <div v-if='signedin' class="row col-12 mt-4 pr-0">
            <div class="col-11 mb-1 replies">
              <textarea rows="2" placeholder="Reply to this comment"  onfocus='this.placeholder = ""' onblur='this.placeholder = "Reply to this comment"' v-model='reply[index]'></textarea>
            </div>
            <div class="col-1 mb-1 replyBtn">
              <button @click='replyComment(comment._id, index)'><i class="fas fa-paper-plane"></i></button>
            </div>
            <div v-if='replyNotice[index].length > 0' class="col-12 mb-2" style='color: #42b983'>{{ replyNotice[index] }}</div>
            <div v-else class="placeholder col-12 mb-2">placeholder</div>
          </div>
          <div class="row col-12 m-0" v-for='(reply, index) in comment.comments' :key='index'>
            <div class="col-1"></div>
            <div class="col-10 text-justify border-top pt-3 pb-2">
              <div class="commenter">
                <b>{{ reply.commenter.name }}</b> replied on {{ reply.createdAt.slice(0, 10) }}
              </div>
              <h6>{{ reply.words }}</h6>
            </div>
            <div class="col-1 border-top pt-3 pb-2" v-if='reply.commenter._id === authuser'>
              <button class='comDelBtn' @click='deleteCommentModal(reply._id)'><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="col-1 border-top pt-3 pb-2" v-else></div>
          </div>
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
        <textarea v-model='content' placeholder="Content" rows="15"></textarea><br>
        <div v-if='notice.length > 0' style='color: #42b983'>{{ notice }}</div>
        <div v-else class="placeholder">placeholder</div>
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
      <!-- DELETE COMMENT MODAL -->
      <div id='delComModal' v-if='openDelComModal'>
        <button @click='deleteCommentModal' class="float-right" style="margin: -25px -25px 0 0; padding: 0; border: 0; background: transparent; color: #42b983"><i class="far fa-times-circle"></i></button>
        <h2>Are you sure<span>?</span></h2><br>
        <h5>The comment will be permanently deleted after this</h5><br>
        <button @click='deleteCommentModal'>No, sorry, that was a mistake</button>
        <button @click='deleteComment'>Yeah, get rid of this shit</button>
      </div>
      <!-- MAP MODAL -->
      <div id='mapContainer' v-if='openMap'>
        <button @click='mapModal' class="float-right" style="margin: -25px -25px 0 0; padding: 0; border: 0; background: transparent; color: #42b983"><i class="far fa-times-circle"></i></button>
        <div id="map"></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import googleMaps from '@google/maps'
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyD-_4BGxBeMuyPyfI_kgmz4YsfpwgjkXNA'
GoogleMapsLoader.VERSION = 'weekly'

const googleMapsClient = googleMaps.createClient({
  key: 'AIzaSyD-_4BGxBeMuyPyfI_kgmz4YsfpwgjkXNA'
});

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
      openMap: false,
      editId: '',
      deleteId: '',
      comment: '',
      commentNotice: '',
      reply: [],
      replyNotice: [],
      openDelComModal: false,
      delComId: ''
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
          this.reply = Array(data.data.data.comments.length).fill('')
          this.replyNotice = Array(data.data.data.comments.length).fill('')
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
    },
    addComment (id) {
      axios({
        url: 'http://localhost:3000/comments',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          words: this.comment,
          postId: id
        }
      })
        .then(() => {
          this.getDetail(this.$route.params.id)
          this.comment = ''
          this.commentNotice = ''
        })
        .catch(err => {
          this.commentNotice = err.response.data.message
          this.replyNotice = Array(this.replyNotice.length).fill('')
        })
    },
    replyComment (id, index) {
      axios({
        url: 'http://localhost:3000/comments/stack',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          words: this.reply[index],
          commentId: id
        }
      })
        .then(() => {
          this.getDetail(this.$route.params.id)
          this.reply.splice(index, 1, '')
          this.replyNotice.splice(index, 1, '')
        })
        .catch(err => {
          this.replyNotice = Array(this.replyNotice.length).fill('')
          this.replyNotice.splice(index, 1, err.response.data.message)
          this.commentNotice = ''
        })
    },
    deleteCommentModal (id) {
      if (id) {
        this.delComId = id
      }
      this.optBackdrop = !this.optBackdrop
      this.openDelComModal = !this.openDelComModal
    },
    deleteComment () {
      axios({
        url: `http://localhost:3000/comments/${this.delComId}`,
        method: 'delete',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.deleteCommentModal()
          this.getDetail(this.$route.params.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    mapLoc (lat, lng, zoom) {
      GoogleMapsLoader.load(google => {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lng},
          zoom: zoom
        });
      })
    },
    geocode () {
      googleMapsClient.geocode({
        address: this.detail.location
      }, (err, response) => {
        if (!err) {
          let lat = response.json.results[0].geometry.location.lat
          let lng = response.json.results[0].geometry.location.lng
          this.mapModal()
          this.mapLoc(lat, lng, 19)
        } else {
          console.log('GEOCODE ERROR ==> ', err)
        }
      });
    },
    mapModal () {
      this.optBackdrop = !this.optBackdrop
      this.openMap = !this.openMap
    }
  },
  filters: {
    contentSlice (value) {
      if (value.length > 280) {
        if (value[279] === ' ') {
          return value.slice(0, 280) + '. . .'
        } else {
          return value.slice(0, 280) + ' . . .'
        }
      } else {
        return value
      }
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
