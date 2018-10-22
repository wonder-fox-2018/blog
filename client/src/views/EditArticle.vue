<template>
    <!-- Comments Form -->
    <div class="card my-4">
      <h5 class="card-header">Edit Article</h5>
      <div class="card-body">
          <div class="form-group">
            Picture :
            <br>
            <input type="file" v-on:change="addImage($event)">
            <br>
            <br>
            Title :
            <input type="text" class="form-control" rows="3" v-model="input_title">
            <br>
            Content :
            <wysiwyg v-model="input_content"/>
            <br>
            <select v-model="input_category" name="Category">
              <option value="5bcd95e598b8c41a2c71af56">Funny</option>
              <option value="5bcd95e098b8c41a2c71af55">Serious</option>
            </select>
          </div>
          <button class="btn btn-primary" v-on:click="submitArticle()">Submit Update</button>
      </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'editarticle',
  data () {
    return {
      token: '',
      input_title: '',
      input_content: '',

      input_image: '',
      new_image: '',

      input_category: ''
    }
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    },
    getValue () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles/${this.$route.params.articleId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((response) => {
          self.input_image = response.data.data.picture
          self.input_title = response.data.data.title
          self.input_content = response.data.data.content
          self.new_image = response.data.data.picture
          self.input_category = response.data.data.category
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitArticle () {
      
      if (this.new_image !== this.input_image) {
        let formdata = new FormData()
        formdata.append('image', this.new_image)

        axios.post(`${config.port}/articles/upload`, formdata, {

        })
          .then((response) => {
            let title = this.input_title
            let content = this.input_content
            let picture = response.data.link
            let category = this.input_category

            let self = this

            let data = {
              title,
              content,
              picture,
              category
            }

            axios({
              method: 'PUT',
              url: `${config.port}/articles/${this.$route.params.articleId}`,
              headers: {
                token: localStorage.getItem('token')
              },
              data
            })
              .then((response) => {
                self.input_title = ''
                self.input_content = ''
                self.input_image = ''
                this.$router.push('/myarticle')
              })
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.input_image === this.new_image) {
        let title = this.input_title
        let content = this.input_content
        let picture = this.input_image
        let category = this.input_category

        let self = this

        let data = {
          title,
          content,
          picture,
          category
        }

        axios({
          method: 'PUT',
          url: `${config.port}/articles/${this.$route.params.articleId}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data
        })
          .then((response) => {
            self.input_title = ''
            self.input_content = ''
            self.input_image = ''
            this.$router.push('/myarticle')
          })
      }
    },
    addImage (link) {
      this.new_image = link.target.files[0]
    }
  },
  mounted () {
    this.checkToken()
    this.getValue()
  },
  created () {
    this.checkToken()
    this.getValue()
  }
}
</script>

<style>

</style>
