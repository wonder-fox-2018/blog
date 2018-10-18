<template lang="html">
  <section class="homepage">
    
    <sidebar :user='user' :articles='articles'></sidebar>
    <articles :user='user' :articles='articles'></articles>

  </section>
</template>

<script lang="js">
  import sidebar from './Sidebar.vue'
  import articles from './Articles.vue'
  export default  {
    name: 'homepage',
    props: ['user','articles'],
    components : {
      sidebar,articles
    },
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

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
  }
</style>
