<template>
  <div class="about">
    <h3>COmplete ARTICLE</h3>
    <h2> {{ $route.params.id }} </h2>
    <p>{{ article }}</p>
    <router-link to="/">back to home</router-link>
  </div>
</template>

<script>
import config from '@/config.js';

export default {
  data () {
    return {
      article : 'empty'
    }
  },
  methods : {
    getArticle(id) {
      let self = this

      axios({
          method: 'GET',
          url: `${config.port}/articles/${id}`
        })
        .then(result => {
          console.log('result', result)
          console.log('result data', result.data)
          self.article = result.data

        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getArticle(this.$route.params.id)
  }
}
</script>
