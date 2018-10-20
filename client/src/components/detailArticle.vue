<template>
  <div class="card mb-4" v-if="show">
    <div class="card-footer text-muted">
      Posted on {{detail.createAt}} by
      <a href="#">{{detail.username}}</a>
    </div>
    <img class="card-img-top" :src="detail.img">
    <h3>{{detail.title}}</h3>
    <div class="card-body">
        <h2 class="card-title">{{detail.category}}</h2>
        <p class="card-text" v-html="detail.article"></p>
    </div>
    <div class="card-footer text-muted">
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        detail : '',
        show : true
      }
    },
    props : ['id'],
    created : function(){
      this.getDetailArticle()
    },
    watch : {
      id(){
        this.getDetailArticle()
      }
    },
    methods: {
      getDetailArticle() {
        // self = this
        axios({
          method : 'GET',
          url : `http://localhost:3000/articles/show/${this.id}`
        })
        .then(response => {
          this.detail = response.data.article
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
}
</script>

