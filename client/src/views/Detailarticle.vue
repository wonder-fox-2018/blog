<template>
    <div>
        <h1>Detail Article</h1>
        <div>
            <div style="width: 40rem;" class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">{{ detailarticle.title }}</button>
                    <br>
                    <br>
                    <p class="card-text">Author: {{detailarticle.author.name }}</p>
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
  props: ['id', 'islogin', 'userbasicinfo'],
  data () {
    return {
      detailarticle: {}
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
          self.detailarticle = article.data.data
        })
        .catch(error => {
          console.log('ERROR Getting Detail Article ', error)
        })
    }
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
