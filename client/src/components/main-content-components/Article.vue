<template>
   <div class="col-sm-8 d-flex flex-column align-items-center">
      <div class="card border article-grid" style="width: 100%;" v-for="(article, index) in articles" :key="index">
        <div class="card-body">
          <h3 class="card-title"><b>{{article.title}}</b></h3>
          <h6 class="card-subtitle mb-2 text-muted"> <i>by: {{article.author.first_name}} {{article.author.last_name}}</i></h6>
          <p class="card-text">{{article.content}}</p>
          <div v-if="article.author._id === userId">
            <a href="#" class="card-link"><i class="far fa-comment"></i></a>
            <a href="#" class="card-link"><i class="far fa-edit"></i></a>
            <a href="#" class="card-link"><i class="far fa-trash-alt"></i></a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['isLogin', 'userId', 'updateArticle'],
    data: function() {
        return {
          articles: [],
        };
    },
    methods: {
      fetchArticle() {
        this.$server({
          url: '/article',
          method: 'GET'
        }).then((result) => {
          this.articles = result.data.reverse();
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    watch: {
      updateArticle() {
        this.fetchArticle();
      }
    },
    created() {
      console.log(this.articles);
      this.fetchArticle();
      console.log(this.articles);
    }
};
</script>

<style scoped>
    .article-grid {
        margin-top: 8%;
        margin-bottom: 8%;
    }
</style>
