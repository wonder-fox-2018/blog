<template>
   <!-- START ALL ARTICLE -->
  <div class="ui cards" style="padding-top:20px;">
    <div class="card" style="width:100%; margin-top:0px;"  v-for="(article, index) in articles" :key="index">
      <div class="ui grid" style="padding:5px;">
        <div class="four wide column">
          <img src="../../../assets/img_1.png" style="width: 100%;">
        </div>
        <div class="twelve wide column">
          <div class="content">
            <div class="header">
              <h3 style="color:#EE4B3E;">{{ article.title }}</h3>
            </div>
            <div class="meta" style="margin-bottom:2px; font-weight: bold;">
              <span>
                <i class="user icon"></i> {{ article.author.name }}
                <i class="calendar alternate icon"></i> {{ new Date(article.createdAt).getFullYear() }}-{{ new Date(article.createdAt).getMonth()+1 }}-{{ new Date(article.createdAt).getDate() }}
              </span>

              <span style="float: right" v-if="isLogin && userEmail">
                <span style="cursor: pointer" onclick="updateArticle()" @click="btnUpdate(article._id)" v-if="userEmail == article.author.email"><i class="edit outline icon"></i> Edit</span>
                <span style="cursor: pointer" v-if="userEmail == article.author.email"><i class="trash alternate icon"></i> Delete</span>
              </span>
            </div>
            <div class="description">
              <p style="text-align: justify;">
                {{ article.content.slice(0, 176)}}...
              </p>
              <router-link :to="{ path : `article/${article._id}` }"><button class="ui grey basic button">Read More</button></router-link>
            </div>
          </div>
        </div>
      </div>

      <UpdateArtice :article-id="articleId" :categories="categories" @status-update-article="statusUpdateArticle"/>

    </div>
  </div>
    <!-- END ALL ARTICLE -->
</template>

<script>
import axios from "axios";
import config from "../../../config.js";
import UpdateArtice from "./UpdateArticle";

export default {
  name: "AllArticle",
  props: ["categories", "isLogin", "userEmail"],
  components: {
    UpdateArtice
  },
  data: function() {
    return {
      articles: [],
      articleId: ""
    };
  },
  created() {
    this.documentReady();
  },
  methods: {
    documentReady: function() {
      axios({
        method: "GET",
        url: `${config.port}/articles`
      })
        .then(response => {
          this.articles = response.data.articles;
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    btnUpdate: function(val) {
      this.articleId = val;
    },

    statusUpdateArticle: function() {
      this.documentReady();
    }
  },
  watch: {
    isLogin: function(val) {
      this.userEmail;
      this.documentReady();
    }
  }
};
</script>

<style>
</style>
