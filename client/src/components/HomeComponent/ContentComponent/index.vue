<template>
   <div class="ten wide column">
     <div class="ui cards" style="padding-top:20px;">
       <router-view :categories="categories"  :is-login="isLogin" :user-email="userEmail"></router-view>
      </div>
   </div>
</template>

<script>
export default {
  name: "Content",
  props: ["categories", "isLogin", "userEmail"]
};
</script>

<style>
</style>
