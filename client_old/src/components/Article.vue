<template>
<!-- Blog Entries Column -->
<div class="container">
    <div class="row">
        <!-- {{allArticle.data}} -->
        <h2></h2>
        

        <div class="col-md-7" v-for="(article, index) in allArticle.data" :key="index" >
            <!-- Blog Post -->
            <div class="card mb-4">
                <img class="card-img-top" src="https://gaminguardian.com/wp-content/uploads/2018/06/Q2TaMh0-800x445.png"
                    alt="Card image cap">
                <div class="card-body">
                    <h2 class="card-title">Slime</h2>
                    <p class="card-text">"Rimuru Tempest" is the new name of a slime in a fantasy world taken by a
                        former 37-year-old human Satoru Mikami after he is killed by a passing robber.
                        Broken free from ordinary, stale past life, his fresh adventure in a fantasy world as a
                        slime monster
                        with unique abilities begins.
                    </p>
                    <router-link :to="`/article/${article._id}`" class="btn btn-primary">Read More →</router-link>
                </div>
                <div class="card-footer text-muted">
                    Posted on October 17, 2018 by
                    <a href="#">Ainz Ooal Gown</a>
                </div>
            </div>
        </div>

        <!-- sidebar col-md-4 -->
        <Sidebar></Sidebar>

        
           
    </div>
</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import config from '@/config.js';

export default {
  name: 'Article',
  components : {
      Sidebar,
  },
  data() {
      return {
          allArticle : ''
      }
  }
  ,methods : {
      fullArticle(){
          console.log('this is full article')
      },
      getAllArticle(){
          console.log('axios untuk dapet semua article nya dulu coy')
        
          let self = this

          axios({
                  method: 'GET',
                  url: `${config.port}/articles/`
              })
              .then(result => {
                  console.log('result',result)
                  console.log('result data',result.data)
                  self.allArticle = result.data
                  
              })
              .catch(err => {
                  console.log(err)
              })
      }
  },
  mounted() {
      this.getAllArticle()
  }
};
</script>
