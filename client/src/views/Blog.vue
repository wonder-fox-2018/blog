<template>
  <div>
    <div class="row" id='main'>
      <div class="col-2"></div>
      <div class="col-3">
        <postlist @posts='updatePost' :signedin='signedin'></postlist>
      </div>
      <div class="col-5">
        <postlarge :posts='posts'></postlarge>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import postlarge from '@/components/postLarge'
import postlist from '@/components/postList'

export default {
  name: 'blog',
  props: ['signedin'],
  data () {
    return {
      posts: []
    }
  },
  components: {
    postlarge,
    postlist
  },
  methods: {
    updatePost (value) {
      this.posts = value
    }
  }
}
</script>

<style>

</style>
