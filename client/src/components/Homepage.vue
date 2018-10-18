<template lang="html">
  <section class="homepage">
    
    <sidebar/>
    <articles :articles='articles'></articles>

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
    grid-template-columns: 1fr 4fr;
  }
</style>
