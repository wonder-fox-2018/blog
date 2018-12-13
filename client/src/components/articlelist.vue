<template>
  <div>
      <div class="container py-4" v-for="(value, index) in article" :key="index">
        <div class="card">
            <div class="card-footer text-muted">
              <p>Posted by {{value.username}}</p>
            </div>
        <div class="row ">
          <div class="col-lg-4 col-12">
              <img class="list-img" :src="value.img" width="200" height="200">
          </div>
          <div class="col-lg-8 col-12 px-6">
            <div class="list-content">
              <div class="card-block px-3">
                <h2 class="card-title"><strong>{{value.title}}</strong></h2>
                <p class="card-text" v-html="value.article.substr(0,100) + ' ...'"></p>
                <button class="btn btn-primary"  @click="detailArticle(value._id)">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['article'],
  data() {
      return {
          
      }
  },
  methods: {
    detailArticle(articleId) {
      this.$router.push({
        name : 'detailArticle',
        params : {
            id : articleId
        }
      })      
    },
  },
}
</script>

<style scoped>
  .card{
    width: 95%!important;
  }
  .col-md-4 .col-12{
    width: 90%!important;
    margin: auto
  }
</style>
