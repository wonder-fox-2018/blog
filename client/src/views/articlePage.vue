<template>
  <div>
    <div class="container">
      <ol class="breadcrumb breadcrumb-post">
        <li class="breadcrumb-item">
          <a class="btn" @click="getAllArticles" >Semua Artikel</a>
          <a class="btn" v-if="user" @click="getMyArticles">Artikel Saya</a>
          <a class="btn" data-toggle="modal" data-target="#create-article" v-if="user">Tulis Artikel Baru</a>
          <a class="btn" v-if="!user">Login Untuk Menulis Artikel</a>

        </li>
      </ol>
    </div>
    <div class="container">
      <div class="row ">
        <div class="col-sm-3" style="">
          <nav class="navbar navbar-light bg-light">
            <div class="form-inline">
              <input class="form-control mr-sm-3" type="search" placeholder="Cari" aria-label="Search" v-model="inputSearch">
              <button class="btn btn-outline-success my-0 my-sm-0" @click="search" >Cari</button>
            </div>
          </nav>
          
          <list :user="user" v-for="(article,index) in articles" :key="index" :article="article"></list>

        </div>
        <div class="col-sm-9" style="min-height: 780px; ">

          <router-view :user="user" @get-all-articles="getAllArticles"></router-view>

        </div>
      </div>
    </div>

    <!-- modal create article -->
    <div id="create-article" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="padding: 5% 10%;">
          <!-- form  -->
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Judul"
              v-model="inputTitle">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Url Image</label>
            <input type="url" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="url img"
              v-model="inputImg">
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Text</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="25" v-model="inputText"></textarea>
          </div>
          <button class="btn btn-primary" data-dismiss="modal" @click="addArticle">Submit</button>
          <!--  -->
        </div>
      </div>
    </div>
    <!-- akhir modal -->




  </div>
</template>

<script>
  import list from '@/components/ListArticles.vue'
  import axios from 'axios';
  export default {
    name: 'ArticleContent',
    props: ['user'],
    components: {
      list
    },
    data() {
      return {
        server: 'http://localhost:3000',
        inputText: '',
        inputTitle: '',
        inputImg: '',
        inputSearch: '',
        articles: []
      }
    },
    created() {
      this.getAllArticles()
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
      },
      getMyArticles() {
        axios({
          method: 'GET',
          url: `${this.server}/articles/my`,
          headers: {
            token: localStorage.getItem('blogToken')
          }
        })
        .then((result) => {
          this.articles = result.data
        }).catch((err) => {
          console.log(err);
        });
      },
      search(){
        axios({
          method: 'GET',
          url: `${this.server}/articles/search/${this.inputSearch}`
        })
        .then((result) => {
          this.inputSearch = ''
          this.articles = result.data.result
          // console.log(result.data.result);          
        }).catch((err) => {
          console.log(err);
        });
      },
      addArticle() {
        let token = localStorage.getItem('blogToken')
        axios({
            method: 'POST',
            url: `${this.server}/articles`,
            headers: {
              token: token
            },
            data: {
              title: this.inputTitle,
              text: this.inputText,
              img: this.inputImg
            }
          })
          .then((result) => {
            this.inputTitle = ''
            this.inputText = ''
            this.inputImg = ''
            this.getAllArticles()
          }).catch((err) => {
            console.log(err.response);
          });
      }
    }
  }
</script>