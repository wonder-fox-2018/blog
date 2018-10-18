<template>
<div class="home">
  <div class="row">
    <Profile :isLogin="isLogin" @updateUserId="updateUserId" @updateArticle="fetchNewArticle"></Profile>
    <Article :isLogin="isLogin" :userId="userId" :updateArticle="updateArticle"></Article>
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
  data() {
    return {
      userId: '',
      updateArticle: '',
    }
  },
  methods: {
    updateUserId(val) {
      this.userId = val;
    },
    fetchNewArticle(val) {
      this.updateArticle = val;
    }
  }
};
</script>
<style scoped>
  .home {
    width: 100%
  }
</style>

