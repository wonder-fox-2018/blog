<template>
  <div>
     <div class="alert alert-success" role="alert" v-if='success'>
        {{ msg }}
      </div>
      <div class="alert alert-danger" role="alert" v-if='error'>
        {{ msg }}
      </div>
    <div class="form-group">
     <label for="image">Insert Article Image:</label>
      <input class="form-control" type="file" name="image" id="" @change='image'>
      or copy the url image from the internet:
      <input v-model="image" class="form-control form-control-lg rounded-0" name="image_url" required="" placeholder="url image">
    </div>
    <div class="form-group">
      <label for="title">Insert Article Title:</label>
      <input class="form-control" type="text" name="title" id="" placeholder='Input Title here..' v-model='title' required>
    </div>
      <label for="contents">Insert Article Contents:</label>
        <wysiwyg v-model='contents'/>
       <!-- <textarea class="form-control" id="exampleFormControlTextarea1" name='contents' rows="5" v-model='contents'></textarea>-->
      
      <button @click='createArticle'>Save Article</button>
    
  </div>
</template>

<script>
export default {
  props: ['isLogin'],
  name: 'createArticle',
  data () {
    return {
      title: '',
      contents: '',
      image: '',
      msg: '',
      success: false,
      error: false
    }
  },
  methods: {
    neutralize(){
      this.msg = '',
      this.error = false,
      this.success = false
    },
     clearState() {
      this.title= '',
      this.contents= '',
      this.image= ''
    },
    createArticle() {
      this.neutralize()
      let self = this
      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      let data = {
        author: userId,
        title: self.title,
        contents: self.contents,
        image: self.image
      }
      axios.post('http://localhost:3000/articles', data)
      .then((result) => {
        // console.log(result)
        self.success = true,
        self.msg = 'Success created new Article'
      }).catch((err) => {
        // console.log('ERROR:', err)
        self.error = true
        self.msg = err.response.data.message || 'internal server error!'
      });
      this.clearState()
    }
  }
}
</script>

<style >
  
</style>