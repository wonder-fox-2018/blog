<template>
   <div>
      <h1>Edit Article</h1>
      <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control"
             v-bind:value="detailarticletitle"
             aria-describedby="emailHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea type="text" v-bind:value="detailarticledescription"
             class="form-control" aria-describedby="emailHelp"
             placeholder="Enter Description">
             </textarea>
        </div>
    </form>
    <button class="btn btn-success"
       v-on:click="editarticle()">Update</button>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Editarticle',
  props: ['id', 'islogin', 'userbasicinfo', 'listarticles', 'getallarticle', 'token'],
  data () {
    return {
      detailarticletitle: '',
      detailarticleauthor: '',
      detailarticledescription: ''
    }
  },
  methods: {
    getdetailarticle () {
      let self = this
      axios({
        method: 'GET',
        url: `http://localhost:3009/articles/${self.id}`
      })
        .then(article => {
          // console.log('Edit ARTICLE-----', article.data.data)
          let detailarticle = article.data.data
          self.detailarticletitle = detailarticle.title
          self.detailarticleauthor = detailarticle.author.name
          self.detailarticledescription = detailarticle.description
        })
        .catch(error => {
          console.log('ERROR Getting Detail Article ', error)
        })
    },
    editarticle () {
      let self = this
      axios({
        method: 'PUT',
        url: `http://localhost:3009/articles/${self.id}`,
        headers: {
          token: self.token
        },
        data: {
          title: self.detailarticletitle,
          description: self.detailarticledescription
        }
      })
        .then(article => {
          this.$router.push({ path: `/article/${self.id}` })
        })
        .catch(error => {
          console.log('ERROR Edit article ', error)
        })
    }
  },
  created () {
    this.getdetailarticle()
  },
  watch: {
    islogin (val) {},
    userbasicinfo (val) {},
    listarticles (val) {},
    token (val) {}
  }
}
</script>

<style>

</style>
