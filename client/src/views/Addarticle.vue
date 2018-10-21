<template>
   <div>
     <h1>Add Article</h1>
     <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control"
             v-model ="articletitle"
             aria-describedby="emailHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea v-model="articledescription" type="text"
             class="form-control" aria-describedby="emailHelp"
             placeholder="Enter Description">
             </textarea>
        </div>
    </form>
    <button v-on:click="addarticle()" class="btn btn-primary">Submit</button>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Addarticle',
  props: ['islogin', 'userbasicinfo', 'listarticles', 'getallarticle'],
  data () {
    return {
      articletitle: '',
      articledescription: ''
    }
  },
  methods: {
    addarticle () {
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3009/articles/',
        headers: {
          token: localStorage.getItem('blogtoken')
        },
        data: {
          title: self.articletitle,
          description: self.articledescription
        }
      })
        .then(article => {
          console.log('Article Created ----', article.data)
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('ERROR Create Article ', error)
        })
    }
  },
  watch: {
    islogin (val) {},
    userbasicinfo (val) {},
    listarticles (val) {}
  }
}
</script>

<style>

</style>
