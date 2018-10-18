<template>
  <div class="ui segment" style="padding-bottom: 40px;">
    <div class="ui grid">
      <Content :categories="categories" :is-login="isLogin" :user-email="userEmail"/>
      <SideBar @set-categories="setCategories" :is-login="isLogin" :user-email="userEmail"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Content from "@/components/HomeComponent/ContentComponent/index.vue";
import SideBar from "@/components/HomeComponent/SidebarComponent/index.vue";

export default {
  name: "home",
  props: ["isLogin", "userEmail"],
  components: {
    Content,
    SideBar
  },
  data: function() {
    return {
      categories: []
    };
  },
  methods: {
    setCategories: function(val) {
      this.categories = val;
    }
  }
};
</script>
