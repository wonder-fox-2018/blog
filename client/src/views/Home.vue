<template>
  <div class="home">
    <Homepage :articles='articles' :getArticles="getArticles" :user='user'></Homepage>

  </div>
</template>

<script>
import Homepage from '@/components/Homepage.vue'

export default {
  name: 'home',
  props : ['setUser','user','articles','getArticles'],
  components: {
    Homepage
  }
}
</script>
