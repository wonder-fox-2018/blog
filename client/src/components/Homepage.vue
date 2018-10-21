<template lang="html">
  <section class="homepage">
    
    <sidebar :user='user' :articles='articles' :setUser='setUser'></sidebar>
    <articles :user='user' :articles='articles' :getArticles='getArticles'></articles>

  </section>
</template>

<script lang="js">
  import sidebar from './Sidebar.vue'
  import articles from './Articles.vue'

  export default  {
    name: 'homepage',
    props: ['user','articles','setUser','getArticles'],
    components : {
      sidebar,articles
    }
}
</script>

<style scoped lang="css">
  .homepage {
    display: grid;
    grid-template-columns: 2fr 5fr;
    /* background-color: rgba(251, 255, 227, 0.226); */
    background: radial-gradient(circle, #ffffff, #ced3ce);
    padding-top: 50px;
    min-height: 650px;
    padding-bottom: 200px;
  }
</style>
