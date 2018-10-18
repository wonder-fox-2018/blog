<template>
<!-- START DETAIL ARTICLE -->
   <div class="card" style="width:100%; margin-top:0px;">
      <div class="forDetailContetnt" style="padding: 10px;">
        <h2 style="color:#EE4B3E;">{{ article.title }}</h2>

        <div class="contentmeta" style="color: grey; margin-bottom: 20px;">
          <span>
            <span v-if="article.author" style="margin-right:10px;"><i class="user icon"></i> {{ article.author.name }}</span>
            <i class="calendar alternate icon"></i> {{ new Date(article.createdAt).getFullYear() }}-{{ new Date(article.createdAt).getMonth()+1 }}-{{ new Date(article.createdAt).getDate() }}
          </span>
          <span style="float: right" v-if="isLogin && userEmail && article.author">
            <span style="cursor: pointer" onclick="updateArticle()" @click="btnUpdate(article._id)" v-if="userEmail == article.author.email"><i class="edit outline icon"></i> Edit</span>
            <span style="cursor: pointer" v-if="userEmail == article.author.email"><i class="trash alternate icon"></i> Delete</span>
          </span>
        </div>

        <div class="contentdetail">
          <div class="imgcontent " style="margin-bottom: 20px;">
            <img src="../../../assets/img_1.png" alt="">
          </div>
          <div class="contentdesc">
            <p style="text-align: justify; font-family: 'PT Sans', sans-serif; font-size:17px;">
              {{ article.content }}
            </p>
          </div>
        </div>
      </div>

      <div class="releatedPost" style="padding: 10px;">
        <h3>Releted Posts : </h3>
        <div style="border: 1px grey solid; border-radius: 5px; padding: 2px; margin-bottom: 5px;">
          <div class="ui grid">
            <div class="two wide column" style="padding-top:20px; padding-left:20px;">
              <img src="../../../assets/img_1.png" style="width: 100%;">
            </div>
            <div class="fourteen wide column">
              <div class="content" style="width: 95%;">
                <div class="header">
                  <h3 style="color:#EE4B3E;">Artikel 1</h3>
                </div>
                <div class="description">
                  <p style="text-align: justify;">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has
                    been the industry's standard <span style="color:#EE4B3E; cursor: pointer;">Read More...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="border: 1px grey solid; border-radius: 5px; padding: 2px; margin-bottom: 5px;">
          <div class="ui grid">
            <div class="two wide column" style="padding-top:20px; padding-left:20px;">
              <img src="../../../assets/img_1.png" style="width: 100%;">
            </div>
            <div class="fourteen wide column">
              <div class="content" style="width: 95%;">
                <div class="header">
                  <h3 style="color:#EE4B3E;">Artikel 1</h3>
                </div>
                <div class="description">
                  <p style="text-align: justify;">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has
                    been the industry's standard <span style="color:#EE4B3E; cursor: pointer;">Read More...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="commentArticle" style="padding: 10px;">

        <div class="boxComment">
          <div class="ui form">
            <div class="field">
              <label>Comment : </label>
              <textarea rows="2" v-model="status"></textarea>
              <button class="fluid ui button" style="margin-top:3px;" @click="btnComment(article._id)">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="listComment" style="margin-top:10px;">
          <h2>Comments : </h2>
          
          <div class="forLoopingComment">
            <div class="ui card" style="width:100%; padding: 10px 0;" v-for="(comment, index) in comments" :key="index">
              <div class="ui grid" style="padding:5px;">
                <div class="two wide column">
                  <div style="margin-left:10px;">
                    <img src="../../../assets/img_1.png" style="width: 100%;">
                  </div>
                </div>
                <div class="fourteen wide column">
                  <div style="padding-right:20px;">
                    <div class="header">
                      <h3>{{ comment.user.name }}</h3>
                    </div>
                    <div class="content">
                      <div class="meta" style="margin-bottom:2px; font-weight: bold;">
                        <span> 
                          <i class="calendar alternate icon"></i> {{ new Date(comment.createdAt).getFullYear() }}-{{ new Date(comment.createdAt).getMonth()+1 }}-{{ new Date(comment.createdAt).getDate() }}
                        </span>
                        <span style="float: right" v-if="comment.user.email">
                          <span style="cursor: pointer" onclick="updateComment()" @click="btnUpdateComment(comment.status, comment._id)" v-if="userEmail == comment.user.email"><i class="edit outline icon"></i>
                            Edit</span>
                          <span style="cursor: pointer" v-if="userEmail == comment.user.email"><i class="trash alternate icon"></i> Delete</span>
                        </span>
                      </div>
                      <div class="description">
                        <p style="text-align: justify;">
                          {{ comment.status }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <UpdateArtice :article-id="articleId" :categories="categories" @status-update-article="statusUpdateArticle"/>
      <UpdateComment :comment-status="commentStatus" :comment-id="commentId" @status-update-comment="statusUpdateComment"/>
    </div>
</template>

<script>
import axios from "axios";
import config from "../../../config.js";
import UpdateArtice from "./UpdateArticle";
import UpdateComment from "./updateComment";

export default {
  name: "DetailArticle",
  props: ["categories", "isLogin", "userEmail"],
  components: {
    UpdateArtice,
    UpdateComment
  },
  data: function() {
    return {
      articleId: "",
      commentStatus: "",
      commentId: "",
      article: [],
      comments: [],
      articleid: "",
      status: ""
    };
  },
  created() {
    this.documentReady();
  },
  methods: {
    documentReady: function() {
      this.articleid = this.$route.params.id;

      axios({
        method: "GET",
        url: `${config.port}/articles/findOne/${this.articleid}`
      })
        .then(response => {
          this.article = response.data.article;
          this.comments = response.data.article.comments;
        })
        .catch(err => {});
    },
    btnUpdate: function(val) {
      this.articleId = val;
    },
    statusUpdateArticle: function() {
      this.documentReady();
    },
    btnComment: function(val) {
      axios({
        method: "POST",
        url: `${config.port}/comments/${val}`,
        data: {
          status: this.status
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.status = "";
          this.documentReady();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    btnUpdateComment: function(valstatus, valid) {
      this.commentStatus = valstatus;
      this.commentId = valid;
    },
    statusUpdateComment: function() {
      this.documentReady();
    }
  },
  watch: {
    isLogin: function() {
      this.documentReady();
    }
  }
};
</script>

<style>
</style>
