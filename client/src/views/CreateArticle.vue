<template>
    <!-- Comments Form -->
    <div class="card my-4">
        <div class="alert alert-primary" v-if="uploading === true" role="alert">
            Please wait while we post your article...
        </div>
        <div class="alert alert-success" v-if="success === true" role="alert">
            Upload Success!
        </div>
        <div class="alert alert-danger" v-if="failed === true" role="alert">
            Upload Failed :(
        </div>
        <h5 class="card-header">Post Article</h5>
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
                Category :
                <br>
                <select v-model="input_category" name="Category">
                    <option value="5bcd95e598b8c41a2c71af56">Funny</option>
                    <option value="5bcd95e098b8c41a2c71af55">Serious</option>
                </select>
            </div>
            <button class="btn btn-primary" v-on:click="submitArticle()">Submit</button>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'createarticle',
  props: ['islogin'],
  data () {
    return {
      token: '',
      input_title: '',
      input_content: '',

      input_image: '',

      input_category: '',

      uploading: false,
      success: false,
      failed: false
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
    submitArticle () {
      this.upload = true

      let formdata = new FormData()
      formdata.append('image', this.input_image)

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
            method: 'POST',
            url: `${config.port}/articles/create`,
            headers: {
              token: self.token
            },
            data
          })
            .then((response) => {
              self.success = true

              self.input_title = ''
              self.input_content = ''
              self.input_image = ''
              console.log(response.data)
            })
        })
        .catch((err) => {
          self.failed = true
          console.log(err)
        })
    },
    addImage (link) {
      this.input_image = link.target.files[0]
    }
  },
  mounted () {
    this.checkToken()
  },
  created () {
    this.checkToken()
  },
  watch : {
    islogin : function(val) {
      this.checkToken()
    }
  }
}
</script>

<style>

</style>
