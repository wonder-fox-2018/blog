<template>
  <section class="articledetail">
    <sidebar :articles='articles' :user='user'></sidebar>
    <articlecard :article='article' :detail='detail' :user='user'></articlecard>
  </section>
</template>



<script>
  import sidebar from '../components/Sidebar';
  import articlecard from "../components/articlecard";
  
  export default {
    name: 'articledetail',
    props: ['articles', 'user'],
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
        this.param = newVal
        this.article = this.articles.filter(item => {
          return item._id == this.param.id
        })[0]
      },
  
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
  }
</style>
