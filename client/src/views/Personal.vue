<template>
  <div class="blog">
    <div class="ui">
      <div class="ui grid">
        <div class="ui one wide form column"></div>
        <div class="ui five wide column">
        <side-bar :personal="personal" :me="me"/>
        </div>
        <div class="ui nine wide form column" style="padding: 3%;">
        <router-view :key="$route.fullPath" :me="me" :isLogin="isLogin"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'personal',
  components: {
    SideBar
  },
  props: ['me', 'isLogin'],
  data () {
    return {
      personal: true
    }
  }
}
</script>

<style scoped>

</style>
