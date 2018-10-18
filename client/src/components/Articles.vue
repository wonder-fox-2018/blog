<template lang="html">
  <section class="articles">
    <h1>Articles</h1>

    <div v-for="article in articles" :key="article._id">
      <h5> {{ article.author }} </h5>
      <h4> {{ article.title }} </h4>
      <h6> {{ article.content }} </h6>
      <br>
    </div>

  </section>
</template>

<script lang="js">
  import sidebar from './Sidebar'
  export default  {
    name: 'articles',
    props: ['articles'],
    components : {
      sidebar
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
  .articles {

  }
</style>
