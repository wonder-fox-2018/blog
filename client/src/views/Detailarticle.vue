<template>
    <div>
        <h1>Detail Article</h1>
        <div>
            <div style="width: 40rem;" class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">{{ detailarticle.title }}</button>
                    <br>
                    <hr>
                    <div v-if="token !== null && token !== '' && detailarticle.author._id === userbasicinfo.userid">
                        <router-link :to="{name: 'editarticle', params: {id: id }}">
                          <button type="button" class="btn btn-warning">
                          Edit</button>
                        </router-link>
                        <button type="button" class="btn btn-danger"
                          v-on:click="deletearticle()">
                          Delete</button>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <p class="card-text">Author: {{ authorname }}</p>
                    <hr>
                    <br>
                    <p><b>Description:</b></p>
                    <br>
                    <br>
                    {{ detailarticle.description }}
                    <hr>
                    <p class="card-text">Comments: </p>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detailarticle',
  props: ['id', 'islogin', 'userbasicinfo', 'listarticles', 'getallarticle', 'token'],
  data () {
    return {
      detailarticle: {},
      authorname: ''
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
          // console.log('DETAIL ARTICLE-----', article.data.data)
          let detailarticle = article.data.data
          self.authorname = detailarticle.author.name
          self.detailarticle = article.data.data
        })
        .catch(error => {
          console.log('ERROR Getting Detail Article ', error)
        })
    },
    deletearticle () {
      let self = this
      axios({
        method: 'DELETE',
        url: `http://localhost:3009/articles/${self.id}`,
        headers: {
          token: self.token
        }
      })
        .then(article => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('ERROR Delete Article ', error)
        })
    }
  },
  created () {
    this.getdetailarticle()
  },
  watch: {
    id (val) {
      this.getdetailarticle()
    },
    islogin (val) {},
    userbasicinfo (val) {}
  }
}
</script>

<style>

</style>
