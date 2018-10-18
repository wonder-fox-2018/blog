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
        <span style='color: blue;'><i class="fa fa-share-alt" aria-hidden="true"></i> Share</span> 
      </div>
      <div class='col-sm-4'>
        <span style='color: brown;'><i class="fa fa-comments" aria-hidden="true"></i> Add Comment &nbsp;&nbsp;</span>
        <span style='color: rebeccapurple;'><i class="fa fa-comments-o" aria-hidden="true"></i> Live Chat</span>
      </div>
    </div>
    <comments></comments>
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

  export default {
    props: ['isLogin'],
    data() {
      return {
        article: '',
        activeId: localStorage.getItem('userId')
      }
    },
    components: {
      comments
    },
    methods: {
      getArticle(id) {
         console.log(id)
        let self = this
        axios.get(`http://localhost:3000/articles/${id}`)
        .then((result) => {
          console.log(result.data)
          self.article = result.data
        }).catch((err) => {
          console.log(err)
        });
      },
      getDate(isoDate) {
        let date = new Date(isoDate);
        return date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear();
      },
      editArticle(id) {
        console.log(id,'--',this.article)
        let self = this
        axios.put(`http://localhost:3000/articles/${id}`, {
          title: self.article.title,
          contents: self.article.contents,
          image: self.article.image
        })
        .then((result) => {
          console.log(result)
          self.getArticle(id)
        }).catch((err) => {
          console.log(err)
        });
      },
      deleteArticle(id) {
        console.log(this.$router)
        let self = this
        axios.delete(`http://localhost:3000/articles/${id}`)
        .then((result) => {
          self.getArticle(id)
          this.$router.push({name:'home'})
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    mounted() {
      
    },
    created() {
      
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
        console.log(val)
      }
    }
  }
</script>

<style >
.main-content {
  background-color: white;
}
#image {
  height: 400px;
  width: 100%;
}
.paragraf {
  text-align: justify;
  text-justify: inter-word;
}
</style>