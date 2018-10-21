<template>
  <section class="articledetail">
    <sidebar :articles='articles' :user='user'></sidebar>
    <transition name="fade">
      <div id="delly">
        <articlecard class="classcard" :article='article' :articles='articles' :detail='detail' :user='user' :getArticles='getArticles'></articlecard>
      </div>
    </transition>
    <router-view/>
  </section>
</template>



<script>
  import sidebar from '../components/Sidebar';
  import articlecard from "../components/articlecard";
  import $ from 'jquery'
  
  export default {
    name: 'articledetail',
    props: ['articles', 'user','getArticles'],
    components: {
      sidebar,
      articlecard
    },
    data() {
      return {
        article: '',
        param: this.$route.params.id,
        detail: true
      }
    },
    created() {
      this.getArticle()
    },
    mounted() {
      this.getArticle()
    },
    watch: {
      '$route.params.id': function(newVal) {
        $("#delly").css("display", "none");
        $("#delly").fadeIn(800).css("display", "normal")
        this.param = newVal
        this.article = this.articles.filter(item => {
          return item._id == this.param
        })[0]
  
      },
      article: {
        immediate: true,
        handler() {
          //
        }
      }
    },
    methods: {
      getArticle() {
        this.article = this.articles.filter(item => {
          return item._id == this.param
        })[0]
      }
    }
  }
</script>

<style scoped lang="css">
  .articledetail {
    display: grid;
    grid-template-columns: 2fr 5fr;
    /* background-color: rgba(251, 255, 227, 0.226); */
    background: radial-gradient(circle, #ffffff, #ced3ce);
    padding-top: 50px;
    min-height: 650px;
    transition: .5s;
    padding-bottom: 130px;
  }
  
  .hidden {
    display: none;
  }
  
  .fade-enter-active {
    transition: opacity 1.5s;
  }
  
  .fade-leave-active {
    opacity: 0;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
