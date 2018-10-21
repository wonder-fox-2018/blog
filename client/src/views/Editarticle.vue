<template>
   <div>
      <h1>Edit Article</h1>
      <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control"
             v-model="detailarticletitle"
             aria-describedby="emailHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea type="text" v-model="detailarticledescription"
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
      detailarticledescription: '',
      updatedlistarticles: [],
      url: 'https://blogapi.efratsadeli.tech'
    }
  },
  methods: {
    getupdatedlistarticles () {
      let self = this
      axios({
        method: 'GET',
        url: `${self.url}/articles/lists`
      })
        .then(articles => {
          self.updatedlistarticles = articles.data.data
        })
        .catch(error => {
          console.log('ERROR Get List Articles ', error)
        })
    },
    getdetailarticle () {
      let self = this
      axios({
        method: 'GET',
        url: `${self.url}/articles/${self.id}`
      })
        .then(article => {
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
        url: `${self.url}/articles/${self.id}`,
        headers: {
          token: self.token
        },
        data: {
          title: self.detailarticletitle,
          description: self.detailarticledescription
        }
      })
        .then(article => {
          self.getupdatedlistarticles()
          this.$emit('updatedlistarticles', self.updatedlistarticles)
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
