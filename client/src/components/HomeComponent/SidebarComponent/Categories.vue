<template>
  <!-- START CATEGORIES -->
    <div class="card" style="width: 100%; margin-top:0px;">
      <div class="content">
        <div class="header">
          Categories
        </div>
        <div class="fluid ui vertical menu" style="">
          <a class="item" v-for="(category, index) in categories" :key="index" @click="getArticleFromCategory(category._id)">
            {{ category.name }}
            <!-- <div class="ui teal left pointing label">1</div> -->
          </a>
        </div>
      </div>
    </div>
  <!-- END CATEGORIES -->
</template>

<script>
import axios from "axios";
import config from "../../../config.js";

export default {
  name: "Category",
  data: function() {
    return {
      categories: []
    };
  },
  created() {
    this.documentReady();
  },
  methods: {
    documentReady: function() {
      axios({
        method: "GET",
        url: `${config.port}/categories`
      })
        .then(response => {
          this.categories = response.data.categories;
          this.$emit("set-categories", this.categories);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getArticleFromCategory: function(categoryId) {
      console.log(categoryId);
    }
  }
};
</script>

<style>
</style>
