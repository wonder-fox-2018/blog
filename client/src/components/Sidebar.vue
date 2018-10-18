<template lang="html">

  <section class="sidebar">
    <profileSec v-if="user" :user='user'></profileSec>

    <div class="listarticle" v-for="article in articles" :key="article._id">
      <li>  {{ article.title.slice(0,20) }} </li>
    </div>
    
  </section>

</template>

<script lang="js">

  import profileSec from './Profile'
  export default  {
    name: 'sidebar',
    props: ['user','articles'],
    components : {
      profileSec
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
  .sidebar {

  }
  .listarticle{
    text-align: left;
    padding: 10px;
    margin-left: 3em;
    font-size: 1.5em;
  } 
</style>
