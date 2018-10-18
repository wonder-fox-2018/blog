<template>
  <div class="home">
    <Homepage :articles='articles' :user='user'></Homepage>

  </div>
</template>

<script>
import Homepage from '@/components/Homepage.vue'

export default {
  name: 'home',
  props : ['setUser','user','articles'],
  components: {
    Homepage
  }
}
</script>
