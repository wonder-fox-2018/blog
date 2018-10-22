<template>
  <div class="container">
    <div id="atas" class="jumbotron">
      <div class="row masthead text-center text-white d-flex">
        <div class="col-md-10 mx-auto">
          <h1 class="text-uppercase">
            <strong>Sudah Ngopi Hari ini ?</strong>
          </h1>
          <hr>
        </div>
        <div class="col-md-8 mx-auto">
          <p class="text-faded mb-5">Ayo berbagi pengalaman ngopi mu disini</p>
        </div>
        
      </div>
    </div>

    <div class="row mx-auto">
      <listhome :user="user" v-for="(article, index) in articles.slice(0,4)" :key="index" :article="article"></listhome>
    </div>
  </div>
</template>

<script>
  import listhome from '@/components/listhome.vue'
  import axios from 'axios'

  export default {
    name: 'Home',
    props: ['user'],
    components: {
      listhome
    },
    created(){
      this.getAllArticles()
    },
    data(){
      return{
        server: 'http://localhost:3000',
        articles: []
      }
    },
    methods: {
      getAllArticles() {        
        axios({
            method: 'GET',
            url: `${this.server}/articles`
        })
        .then((result) => {
            this.articles = result.data
        }).catch((err) => {
            console.log(err);
        });
      }
    }
  }
</script>

<style>
  #atas {
    background-image: url(https://majalah.ottencoffee.co.id/wp-content/uploads/2016/01/Coffeebeanz-txuhmf.jpg);

  }

  #bawah {
    background-image: url(https://majalah.ottencoffee.co.id/wp-content/uploads/2016/01/christiania-catering-coffee-bike-in-arnhem.jpg);
  }
</style>