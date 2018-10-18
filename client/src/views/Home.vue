<template>
  <div class="home">
    <div class="ui segment">
      <div class="ui grid">
        <div class="ui one wide form column"></div>
        <div class="ui five wide column">
          <side-bar/>
        </div>
        <div class="ui nine wide form column">
          <router-view></router-view>
        </div>
        <div class="ui one wide form column"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'home',
  components: {
    SideBar
  }
}
</script>

<style scoped>

</style>
