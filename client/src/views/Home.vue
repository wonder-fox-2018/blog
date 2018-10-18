<template>
  <div class="home">
    <HelloWorld :msg="message" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  props : ['test'],
  data() {
    return {
      message : 'Learn Using Vue CLI'  
    }
  },
  components: {
    HelloWorld
  }
}
</script>
