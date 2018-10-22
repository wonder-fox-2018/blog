<template>
  <div class="six wide column">
    <div class="ui cards" style="padding-top:20px;">
      
      <BtnCreateArticle v-if="isLogin"/>
      <Category @set-categories="setCategories" @article-from-category="articleFromCategory"/>
      <PopularArticle/>
      <Chatting :is-login="isLogin" :user-email="userEmail"/>

    </div>
  </div>
</template>

<script>
import Category from "./Categories.vue";
import PopularArticle from "./PopularArticle";
import BtnCreateArticle from "./BtnAddArticle";
import Chatting from "./chatting"

export default {
  name: "SideBar",
  props: ["isLogin", "userEmail"],
  components: {
    Category,
    PopularArticle,
    BtnCreateArticle,
    Chatting
  },
  data: function() {
    return {};
  },
  methods: {
    setCategories: function(val) {
      this.$emit("set-categories", val);
    },
    articleFromCategory: function(val) {
      this.$emit("article-from-category", val);
    }
  }
};
</script>

<style>
</style>
