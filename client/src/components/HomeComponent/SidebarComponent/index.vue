<template>
  <div class="six wide column">
    <div class="ui cards" style="padding-top:20px;">
      
      <BtnCreateArticle v-if="isLogin"/>
      <Category @set-categories="setCategories"/>
      <PopularArticle/>

    </div>
  </div>
</template>

<script>
import Category from "./Categories.vue";
import PopularArticle from "./PopularArticle";
import BtnCreateArticle from "./BtnAddArticle";

export default {
  name: "SideBar",
  props: ["isLogin", "userEmail"],
  components: {
    Category,
    PopularArticle,
    BtnCreateArticle
  },
  data: function() {
    return {};
  },
  methods: {
    setCategories: function(val) {
      this.$emit("set-categories", val);
    }
  }
};
</script>

<style>
</style>
