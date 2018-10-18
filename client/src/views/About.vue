<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h5>{{msg}}</h5>
  </div>
</template>

<script>
export default {
  name : 'about',
  props: ['msg'],
}
</script>

