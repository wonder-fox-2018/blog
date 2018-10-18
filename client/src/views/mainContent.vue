<template>
  <div>
    <div class="container">
      <ol class="breadcrumb breadcrumb-post">
        <li class="breadcrumb-item">
          <a class="btn" data-toggle="modal" data-target="#create-article" v-if="user">Tulis Artikel Baru</a>
          <a v-if="!user">Login Untuk Menulis Artikel</a>
        </li>
      </ol>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-3" style="">
          <list></list>
        </div>
        <div class="col-sm-9" style="min-height: 780px; border-left:1px solid black">

          <router-view></router-view>

        </div>
      </div>
    </div>

    <!-- modal create article -->
    <div id="create-article" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"  aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="padding: 5% 10%;">
          <!-- form  -->
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" v-model="inputTitle">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Url Image</label>
              <input type="url" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" v-model="inputImg">
            </div>
             <div class="form-group">
              <label for="exampleFormControlTextarea1">Text</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="25" v-model="inputText"></textarea>
            </div>
            <button class="btn btn-primary" @click="addArticle">Submit</button>
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
    name: 'mainContent',
    props: ['user'],
    components: {
      list
    },
    data(){
      return {
        server: 'http://localhost:3000',
        inputText: '',
        inputTitle: '',
        inputImg: ''
      }
    },
    methods: {
      addArticle(){
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
          console.log(result.data.msg);

          
        }).catch((err) => {
          console.log(err.response);
        });
      }
    }
  }
</script>