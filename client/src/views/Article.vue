<template>
  <div class="article">
    <h1>This is an article page</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'article',
  data () {
    return {
      article: [],
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    // getAllArticle () {
    //   let self = this
    //   axios (this.baseurl + '/articles')
    //   .then(response => {
    //     console.log('all article', response.data.articles)
    //     self.articles = response.data.articles
    //   })
    //   .catch(error => {
    //     console.log(error.response)
    //   })
    // }
  },
  created() {
    // this.getAllArticle()
  },
}
</script>
