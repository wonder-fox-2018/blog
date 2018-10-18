<template>
   <div class="col-sm-8 d-flex flex-column align-items-center">
      <div class="card border article-grid" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      <div class="card border article-grid" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title"><b>Title</b></h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['isLogin'],
    data: function() {
        return {

        };
    },
    methods: {
        
    },
    watch: {
        isLogin() {
          
        }

        
    }
};
</script>

<style scoped>
    .article-grid {
        margin-top: 5%;
        margin-bottom: 5%;
    }
</style>
