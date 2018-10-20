<template>
<div class="home">
  <div class="row d-flex justify-content-center">
    <Profile :isLogin="isLogin" @updateUserId="updateUserId" @updateArticle="fetchNewArticle" v-if="isLogin" :updateProfile="updateProfile"></Profile>
    <Article :isLogin="isLogin" :userId="userId" :updateArticle="updateArticle" @updateProfile="fetchNewProfile"></Article>
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
      updateProfile: '',
    };
  },
  methods: {
    updateUserId(val) {
      this.userId = val;
    },
    fetchNewArticle(val) {
      this.updateArticle = val;
    },
    fetchNewProfile(id) {
      this.updateProfile = id;
    }
  }
};
</script>
<style >
  .home {
    width: 100%
  }
</style>

