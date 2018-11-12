<template>
  <div class="ui comments">
    <div class="comment">
      <a class="avatar">
        <img :src="chatVal.avatar">
      </a>
      <div class="content">
        <a class="author">{{ chatVal.name }}</a>
        <div class="metadata">
          <span style="text-align:right;">{{ chatVal.time}}</span>
        </div>
        <div class="text">
          {{ chatVal.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-body',
  props: ['chatVal']
}
</script>

<style>

</style>
