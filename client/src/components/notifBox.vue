<template>
<div class="ui centered grid">
  <div :class="sizeBox">
    <div class="ui mini message" :class="payload.status">
      <div class="header">
        {{ payload.header }}
      </div>
      <p>{{ payload.message }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'notifBox',
  props: ['payload'],
  computed: {
    sizeBox() {
      return `ui ${this.payload.size} wide column`
    }
  }
}
</script>

<style>

</style>
