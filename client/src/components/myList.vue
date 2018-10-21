<template>
    <div class="col-md-12">
      <div class="container py-3" v-for="(value, index) in myArticle" :key="index">
        <div class="card">
            <div class="card-footer text-muted">
                <h4 class="card-title">{{value.title}}</h4>
            </div>
          <div class="row ">
            <div class="col-md-4 col-12">
                <img :src="value.img" width="200" height="200">
            </div>
            <div class="col-md-8 col-12 px-6">
                <div class="card-block px-3">
                <p class="card-text">Posted on {{value.createAt}}</p>
                <p class="card-text">by {{value.username}}</p>
                <button class="btn btn-primary"  @click="detailArticle(value._id)">Read More</button>
                </div>
                <div class="py-3">
                  <button class="btn btn-secondary" @click="deleteArticle(value._id)">Delete</button>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['article', 'category', 'updatecomponent'],
  data() {
    return {
      myArticle : ''
    }
  },
  watch: {
    category() {
      console.log(this.category)
      if(this.category === 'all'){
        this.getMyList()
      }
      else {
        this.getListByCategory()
      }
    },
  },
  created : function(){
    if(this.category === 'all'){
      this.getMyList()
    }
    else{
      this.getListByCategory()
    }
  },
  methods: {
    deleteArticle : function(value){
      console.log(value)
      axios({
        method : 'DELETE',
        url : `http://localhost:3000/articles/delete/${value}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response)
        this.getMyList()
        this.updatecomponent()
      })
      .catch(err => {
        console.log(err)
      })
    },
    detailArticle(articleId) {
      this.$router.push({
        name : 'detailArticle',
        params : {
            id : articleId
        }
      })      
    },
    getMyList(){
      axios({
        method : 'GET',
        url : `http://localhost:3000/articles/myarticle`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        this.myArticle = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getListByCategory(){
      axios({
        method : 'GET',
        url : 'http://localhost:3000/articles/show',
      })
      .then(response => {
        // console.log(response.data)
        // this.myArticle = response.data
        let byCategory = response.data.filter(datum => {
          return this.category === datum.category
        })
        console.log(byCategory)
        this.myArticle = byCategory
      })
      .catch(err => {
        console.log(err)
      })
    }      
  },
}
</script>

<style>
.card{
  width: 95%!important;
}
.col-md-4{
  width: 100%!important
}
</style>
