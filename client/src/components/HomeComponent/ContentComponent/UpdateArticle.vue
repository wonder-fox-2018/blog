<template>
  <!-- Start Modal Update Article -->
  <div class="ui small modal modalUpdateArticle">
    <div class="header">
      Update Article
    </div>
    <div class="content">
      <div class="ui fluid card">
        <div class="content">

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
              <!-- <textarea placeholder="Content Article" v-model="content"></textarea> -->
              <wysiwyg v-model="content" />
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="actions">
      <div class="ui button" onclick="closemodalupdate()">Cancel</div>
      <div class="ui button" @click="btnUpdate">Update</div>
    </div>
  </div>
  <!-- End Modal Update Article -->
</template>

<script>
import axios from "axios";
import config from "../../../config.js";

export default {
  name: "UpdateArtice",
  props: ["articleId", "categories", "test"],
  data: function() {
    return {
      title: "",
      image: "",
      category: "",
      content: "",
      categoryId: "",
      articleid: "",

      messageError: "",
      boxError: false,
      statusUpdate: 0,
    };
  },
  mounted() {},
  methods: {
    btnUpdate: function() {

      let data = {
        title: this.title,
        category: this.categoryId,
        content: this.content,
        picture: "dummy.jpg"
      };

      axios({
        method: "PUT",
        url: `${config.port}/articles/${this.articleid}`,
        data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.statusUpdate++;
          this.$emit("status-update-article", this.statusUpdate);
          $(".small.modal.modalUpdateArticle")
            .modal({
              transition: "zoom"
            })
            .modal("hide");
          this.boxError = false;
        })
        .catch(err => {
          this.messageError = Object.values(
            err.response.data.err.errors
          )[0].message;
          this.boxError = true;
        });
    },

    closeErrorMsg: function() {
      this.boxError = false;
    }
  },
  watch: {
    articleId: function(val) {
      axios({
        method: "GET",
        url: `${config.port}/articles/findOne/${val}`
      })
        .then(response => {
          this.articleid = response.data.article._id;
          this.title = response.data.article.title;
          this.content = response.data.article.content;
          this.categoryId = response.data.article.category;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style>
</style>
