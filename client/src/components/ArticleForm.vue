<template>
  <div class="ui form">
    <h1 v-if="addModal" style="font-size: 80px;">Create Article</h1>
    <h1 v-else style="font-size: 80px;">Edit Article</h1>
    <div class="field">
      <label>Title</label>
      <input v-if="addModal" v-model="title" type="text" placeholder="Enter article title here...">
      <input v-else type="text" v-model="article.title" placeholder="Enter article title here...">
    </div>
    <div class="field">
      <label>Image Link</label>
      <input v-if="addModal" v-model="imageurl" type="text" placeholder="Enter image link here...">
      <input v-else v-model="article.imageurl" type="text" placeholder="Enter image link here...">
    </div>
    <div class="field" id="desc1" v-if="addModal">
      <label>Content</label>
      <input v-model="desc" class="editable">
    </div>
    <div class="field" id="desc2" v-else>
      <label>Content</label>
      <input v-model="article.desc" class="editable">
      <small style="color: #4bc2a7; font-size: 13px;">Reload this page if your browser fail to render the previous content</small>
    </div>
    <div class="field">
      <label>Category</label>
      <input v-if="addModal" v-model="category" type="text" id="category">
      <input v-else v-model="article.category" type="text" id="category">
      <small style="color: white; font-size: 13px;">You may add multiple categories and separate them with a comma.</small>
    </div>
    <div v-if="addModal" class="ui submit teal button" @click="createArticle">Post</div>
    <div v-else class="ui submit teal button" @click="editArticle">Post</div>
    <div v-if="addModal" class="ui button" @click="$emit('addModal')">Cancel</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'article-form',
  props: ['addModal'],
  data () {
    return {
      title: '',
      desc: '',
      imageurl: '',
      category: '',
      article: '',
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    createArticle () {
      let self = this
      let categories = []
      let tmp = self.category.split(',')
      tmp.forEach(elem => {
        elem = elem.trim()
        categories.push(elem)
      })
      axios({
        method: 'POST',
        url: this.baseurl + '/articles',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: self.title,
          desc: self.desc,
          imageurl: self.imageurl,
          category: categories
        }
      })
        .then(response => {
          this.$router.push('/blog')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    editArticle () {
      let self = this
      console.log('start editing', self.article.desc)
      axios({
        method: 'PUT',
        url: this.baseurl + `/articles/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: self.article.title,
          desc: self.article.desc,
          imageurl: self.article.imageurl,
          category: self.article.category
        }
      })
        .then(response => {
          this.$router.push('/blog')
        })
        .catch(error => {
          console.log('get error', error.response)
        })
    },
    getArticleById () {
      let self = this
      axios
        .get(this.baseurl + `/articles/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          self.article = response.data.article[0]
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  mounted () {
    let self = this
    tinymce.init({
      selector: '#desc1 input.editable',
      height: 200,
      init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
          self.desc = e.target.innerHTML
        })
      }
    })
    tinymce.init({
      selector: '#desc2 input.editable',
      height: 200,
      init_instance_callback: function (editor) {
        editor.on('keyup', function (e) {
          self.article.desc = e.target.innerHTML
        })
      }
    })
  },
  created () {
    if (this.$route.name === 'edit') {
      this.getArticleById()
    }
  }
}
</script>

<style scoped>
.form,
.field,
.ui.form input[type="text"],
.ui.form input[type="password"] {
  text-align: left;
}

.field label {
  width: 100%;
  color: #9edfd0!important;
}

</style>
