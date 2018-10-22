<template>
   <!-- START ALL ARTICLE -->
  <div class="ui cards" style="padding-top:20px;">
    <div class="card" style="width:100%; margin-top:0px;"  v-for="(article, index) in articles" :key="index">
      <div class="ui grid" style="padding:5px;">
        <div class="four wide column">
          <img src="https://via.placeholder.com/650x650" style="width: 100%;">
        </div>
        <div class="twelve wide column" style="padding-right:25px;">
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
                <span style="cursor: pointer" @click="btnDelete(article._id)" v-if="userEmail == article.author.email"><i class="trash alternate icon"></i> Delete</span>
              </span>
            </div>
            <div class="description">
              <div style="text-align: justify;" v-html="article.content.slice(0, 170) + ' ...'"></div>
              <router-link :to="{ path : `article/${article._id}` }"><button class="ui grey basic button">Read More</button></router-link>
            </div>
            <div style="position:absolute; bottom:20px; right:20px;">
              <span class="meta">
                <i class="wechat icon"></i> ({{ article.comments.length }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <UpdateArtice :test="article._id" :article-id="articleId" :categories="categories" @status-update-article="statusUpdateArticle"/>

    </div>

    <div class="card" style="width:100%; margin-top:0px; text-align:center; padding: 10px;" v-if="totalArticle > 5 && statusPagging">
      <div class="paggination">
        <button class="ui left labeled icon button" @click="btnPagging('back')">
          <i class="left arrow icon"></i>
          Back
        </button>
        <button class="ui right labeled icon button" @click="btnPagging('next')">
          <i class="right arrow icon"></i>
          Next
        </button>
      </div>
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
  props: [
    "categories",
    "isLogin",
    "userEmail",
    "searchArticle",
    "statusHome",
    "categoryIdFromCat",
    "myarticle"
  ],
  components: {
    UpdateArtice
  },
  data: function() {
    return {
      articles: [],
      articleId: "",
      paggingCount: 1,
      trigger: true,
      totalArticle: 0,
      statusPagging: true
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
          this.totalArticle = response.data.articles.total
          this.articles = response.data.articles.docs
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    btnUpdate: function(val) {
      this.articleId = val;
    },

    btnDelete: function(val) {
      axios({
        method: "DELETE",
        url: `${config.port}/articles/remove/${val}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.documentReady();
        })
        .catch(err => {
          // console.log(err.response.data.message);
        });
    },

    statusUpdateArticle: function() {
      this.documentReady();
    },

    btnPagging: function(val) {

      if(this.totalArticle > 5) {
        if(val == 'next'){
        this.paggingCount++
      } else {
          if(!this.trigger){
            this.paggingCount++
            this.paggingCount--
            this.trigger = true
          } else {
            if(this.paggingCount == 1){
              this.paggingCount = 1
            } else {
              this.paggingCount--
            }
          }
      }
    
      axios({
        method: "GET",
        url: `${config.port}/articles/articlePagginations?perPage=5&page=${this.paggingCount}`
      })
      .then((response) => {

        let perpage = response.data.articles.pages
        if(this.paggingCount == perpage && val == 'next') {
          this.paggingCount = perpage - 1 
          this.trigger = false
        }

        this.articles = response.data.articles.docs
        
      }).catch((err) => {
        
      });
      }
        
    } 
      
  },
  watch: {
    isLogin: function(val) {
      this.userEmail;
      this.documentReady();
    },
    searchArticle: function(val) {
      val = val.trim();
      axios({
        method: "GET",
        url: `${config.port}/articles/search?title=${val}`
      })
        .then(response => {
          this.articles = response.data.articles;
          this.statusPagging = false
        })
        .catch(err => {});
    },
    statusHome: function(val) {
      this.documentReady();
      this.statusPagging = true
      // this.$router.push("/");
    },
    categoryIdFromCat: function(val) {
      axios({
        method: "GET",
        url: `${config.port}/articles/searchbycat?categoryid=${val.categoryid}`
      })
        .then(response => {
          this.articles = response.data.articles;
          this.statusPagging = false
          // this.$router.push("/");
        })
        .catch(err => {});
    },
    myarticle: function(val) {
      this.articles = val
      this.statusPagging = false
    }
  }
};
</script>

<style>
</style>
