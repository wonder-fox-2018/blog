<template>
  <div class="blog">
    <div class="ui">
      <div class="ui grid">
        <div class="ui one wide form column"></div>
        <div class="ui five wide column">
        <side-bar :me="me"/>
        </div>
        <div class="ui nine wide form column" style="padding: 3%;">
        <router-view :key="$route.fullPath" :isLogin="isLogin" :me="me"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'blog',
  components: {
    SideBar
  },
  props: ['me', 'isLogin']
}
</script>

<style scoped>

</style>
