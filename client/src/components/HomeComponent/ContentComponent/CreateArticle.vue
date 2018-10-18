<template>
   <!-- START CREATE ARTICLE -->
    <div class="card" style="width:100%; margin-top:0px;">

      <div style="padding:5px;">

      <!-- START SUCCESS MESSAGE -->
        <div class="ui success message" v-if="boxSuccess">
          <i class="close icon" @click="closeSuccessMsg"></i>
          <div class="header">
            <P style="text-transform: uppercase;">{{ messageSuccess }}</P>
          </div>
        </div>

        <!-- START ERROR MESSAGE -->
        <div class="ui negative message" v-if="boxError">
          <i class="close icon" @click="closeErrorMsg"></i>
          <div class="header">
            <P style="text-transform: uppercase;">{{ messageError }}</P>
          </div>
        </div>

        <div class="ui form">
          <div class="field">
            <label>Title</label>
            <input type="text" placeholder="Title" v-model="title">
          </div>
          <div class="field">
            <label>Image</label>
            <input type="file">
          </div>
          <div class="field">
            <label>Select Categories</label>
            <select class="ui search dropdown" v-model="categoryId">
              <option :value="category._id" v-for="(category, index) in categories" :key="index">{{ category.name }}</option>
            </select>
          </div>
          <div class="field">
            <label>Content</label>
            <textarea placeholder="Content Article" v-model="content"></textarea>
          </div>
          <button @click="btnCreateArticle" class="fluid ui button" type="submit" style="float:right;">Submit</button>
        </div>
      </div>
    </div>
    <!-- END CREATE ARTICLE -->
</template>

<script>
import axios from "axios";
import config from "../../../config.js";

export default {
  name: "CreateArticle",
  props: ["categories", "isLogin", "userEmail"],
  data: function() {
    return {
      title: "",
      categoryId: "",
      content: "",

      messageSuccess: "",
      messageError: "",
      boxSuccess: false,
      boxError: false
    };
  },
  methods: {
    btnCreateArticle: function() {
      let data = {
        title: this.title,
        category: this.categoryId,
        content: this.content
      };

      axios({
        method: "POST",
        url: `${config.port}/articles`,
        data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.$router.push(`/article/${response.data.article._id}`);
        })
        .catch(err => {
          let error = Object.values(err.response.data.err.errors)[0].message;
          this.messageError = error;
          this.boxError = true;
          this.boxSuccess = false;
        });
    },
    closeSuccessMsg: function() {
      this.boxSuccess = false;
    },
    closeErrorMsg: function() {
      this.boxError = false;
    }
  },
  watch: {
    isLogin: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
