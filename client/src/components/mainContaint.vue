<template>
  <div class='main-content'>
  <br>
    <h3>{{ article.title }}</h3>
    <h6>by {{ article.author.username }}</h6>
    <hr>
      <p>Posted on {{ getDate(article.createdAt) }}</p>
    <div>
      <img id='image' :src=" article.image " alt="">
    </div>
    <hr>
    <div class='paragraf' v-html="article.contents">
      
    </div>
    <div v-if='activeId === article.author._id'><br><br>
      <button class='btn-sm btn-primary' data-toggle="modal" data-target="#editModal">Edit Article</button> &nbsp; <button class='btn-sm btn-danger' data-toggle="modal" data-target="#deleteModal">Delete Article</button>
    </div>
    <hr>
    <div class='row' id='icons'>
      <div class='col-sm-4'>
        <span style='color: red;'><i class="fa fa-heart"></i> Like &nbsp;&nbsp;</span>
        <span  style='color: darkblue;'><i class="fa fa-thumbs-down" aria-hidden="true"></i> Hate</span>
          <span></span>
      </div>
      <div class='col-sm-4'>
        <span style='color: blue;' @click='showShare'><i class="fa fa-share-alt" aria-hidden="true"></i> Share</span> 
      </div>
      <div class='col-sm-4'>
        <span style='color: brown;' @click='showCommentsForm(article._id)'><i class="fa fa-comments" aria-hidden="true"></i> Add Comment &nbsp;&nbsp;</span>
        <span style='color: rebeccapurple;' @click='showGlobalChats'><i class="fa fa-comments-o" aria-hidden="true"></i> Live Chat</span>
      </div>
    </div>
    <comments></comments>
    <share v-if='shareOpen' :article='article' :user='article.author.username'></share>
    <div v-if='showGlobalChat'>
      <input class='form-control' type='text' placeholder='Enter the message here...' v-model='messageChat' @keyup.enter='submitChat' />
      
      <div class="liveChat" v-for="(chat,index) in listChat" :key='index'>
        <span>{{ chat.name }}:</span> <p>{{ chat.message }}</p>
      </div>
    </div>

    <div class='comments' v-if='showComments'>
      <h3>User Comments:</h3>
      <hr>
      <textarea style='min-height:100px; min-width:700px' placeholder='Enter your comment here...' v-model='comment' /><br>
      <button @click='submitComment(article._id)'>Submit Comment</button>
      <button @click='showCommentsForm(article._id)'>Refresh Comment</button>
      <div v-for='comment in allComments' class='commentBox'>
        <div>posted on: {{ getDate(comment.createdAt) }}</div>
        <div style='text-align:left; padding-left:5px;'>{{ comment.user.username }} commented:</div>
        <div style='text-align:right ; padding-right:5px;'>{{ comment.comment }}</div>
      </div>
    </div>

    <!-- MODAL EDIT -->
      <div class="modal fade " id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your article Here:</h5>
              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="image">Insert Article Image:</label>
                  <input class="form-control" type="file" name="image" id="">
                  or copy the url image from the internet:
                  <input class="form-control form-control-lg rounded-0" name="image_url" required="" v-model='article.image'>
                </div>
                <div class="form-group">
                  <label for="title">Insert Article Title:</label>
                  <input class="form-control" type="text" name="title" id="" placeholder='Input Title here..' v-model='article.title' required>
                </div>
                  <label for="contents">Insert Article Contents:</label>
                    <wysiwyg v-model='article.contents'/>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click='editArticle(article._id)' data-dismiss="modal">Edit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    <!-- / MODAL EDIT -->
    <!-- MODAL Delete -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Delete This Article ?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {{article.author.username}}, are you sure ?
              Do you really want to delete this article ??
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click='deleteArticle(article._id)' data-dismiss="modal">Yes, Just Delete It!</button>
            </div>
          </div>
        </div>
      </div>
      <!-- / MODAL Delete -->
  </div>
</template>

<script>
  import comments from '@/components/comments.vue';
  import share from '@/components/share.vue'
  import db from '../assets/config.js'

  export default {
    props: ['isLogin', 'getDate'],
    data() {
      return {
        article: '',
        activeId: localStorage.getItem('userId'),
        showGlobalChat: false,
        listChat:'',
        messageChat:'',
        removeList: '',
        comment: '',
        allComments: [],
        shareOpen: false,
        showComments: false
      }
    },
    components: {
      comments, share
    },
    methods: {
      getArticle(id) {
         console.log(id)
        let self = this
        axios.get(`http://localhost:3000/articles/${id}`)
        .then((result) => {
          // console.log(result.data)
          self.article = result.data
          this.showComments = false
        }).catch((err) => {
          console.log(err)
        });
      },
      editArticle(id) {
        console.log(id,'--',this.article)
        let self = this
        axios.put(`http://localhost:3000/articles/${id}`, {
          title: self.article.title,
          contents: self.article.contents,
          image: self.article.image
        }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((result) => {
          console.log(result)
          self.getArticle(id)
        }).catch((err) => {
          console.log(err)
        });
      },
      deleteArticle(id) {
        console.log('masukkk kedelete...', id)
        let self = this
        axios.delete(`http://localhost:3000/articles/${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((result) => {
          self.getArticle(id)
          this.$router.push({name:'home'})
          this.getArticle()
        }).catch((err) => {
          console.log(err)
        });
      },
      submitChat() {
        try {
          db.ref(`/db/globalChat`).push({
            name: localStorage.getItem('username'),
            message: this.messageChat,
          })
        } catch (error) {
          console.log(error)
        }
        this.messageChat = ''
      },
      refreshLobby() {
        db.ref('/db/globalChat').on('value', snapshot => {
          if (snapshot.val()) {
          this.listChat = Object.values(snapshot.val())
              .reverse()
              .slice(0, 9)
              .reverse()
          this.removeList = Object.keys(snapshot.val())
              .reverse()
              .slice(9)
          }
        })
      },
      showCommentsForm(id) {
        this.showGlobalChat = false
        this.showComments = true
        this.showAllComments(id)
      },
      showAllComments(id) {
        self = this
        axios.get(`http://localhost:3000/comments/${id}`)
        .then((result) => {
          self.allComments = result.data
        }).catch((err) => {
          console.log(err)
        });
      },
      showGlobalChats() {
        this.showGlobalChat = true
        this.showComments = false
      },
      submitComment(id) {
        let self = this
        axios.post(`http://localhost:3000/comments`, {
          user: localStorage.getItem('userId'),
          comment: self.comment,
          article: id
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((result) => {
          // console.log('hasil dari submit comment--',result.data)
          self.showAllComments(id)
          self.comment=''
        }).catch((err) => {
          console.log(err)
        });
      },
      showShare() {
        this.shareOpen = true
      }
    },
    mounted() {
      
    },
    created() {
      this.refreshLobby()
      this.showComments = false
    },
    computed: {
      getParamsId: function() {
        return this.$route.params.id
      }
    },
    watch: {
      getParamsId: function(val) {
        this.getArticle(val)
      },
      article: function(val) {
        // console.log(val)
      },
      showComments: function(val) {
        console.log('status showComment-->', val)
      }
    }
  }
</script>

<style >
.main-content {
  background-color: white;
}
#image {
  min-height: 400px;
  width: 100%;
}
.paragraf {
  text-align: justify;
  text-justify: inter-word;
  width: 100%
}
#icons span:hover{
  cursor: pointer;
  background-color: wheat;
}
.commentBox {
  border: 1px solid brown;
  margin: 5px auto;
  min-width:700px;
  background-color: #e6e6fa;
}
.liveChat {
  border: 1px solid cyan;
  min-width:auto;
  background-color: #c6e2ff;
  border-radius: 50px;
}
.liveChat span {
  text-align: left;
}
.liveChat p {
  text-align: center;
}
</style>