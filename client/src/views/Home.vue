<template>
<div class="home">
  <div class="row">
    <Profile :isLogin="isLogin"></Profile>
    <Article :isLogin="isLogin"></Article>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/main-content-components/Profile.vue'
import Article from '@/components/main-content-components/Article.vue';

export default {
  name: 'home',
  components: {
    Profile,Article,
  },
  props: ['isLogin'],
  watch: {
    isLogin() {
      console.log('masuk');
    }
  }
};
</script>
<style scoped>
  .home {
    width: 100%
  }
</style>

