<template>
  <div id="app">
    <div class="container" style="width:1100px; margin: 0 auto; padding:10px;">
      <NavBar @myarticle="MyArticle" @status-home="statushome" @status-login="statusLogin"  @status-email="statusEmail" @status-search-article="statusSearchArticle"/>
      <router-view :myarticle="myarticle" :category-id-from-cat="categoryIdFromCat" @article-from-category="articleFromCategory" :status-home="statusHome" :is-login="isLogin" :user-email="userEmail" :search-article="searchArticle"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarComponent/index.vue";

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: function() {
    return {
      isLogin: false,
      userEmail: "",
      searchArticle: "",
      statusHome: 0,
      categoryIdFromCat: "",
      myarticle: []
    };
  },
  methods: {
    statusLogin: function(val) {
      this.isLogin = val;
    },
    statusEmail: function(val) {
      this.userEmail = val;
    },
    statusSearchArticle: function(val) {
      this.searchArticle = val;
    },
    statushome: function(val) {
      this.statusHome = val;
    },
    articleFromCategory: function(val) {
      this.categoryIdFromCat = val;
    },
    MyArticle: function(val) {
      this.myarticle = val
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
