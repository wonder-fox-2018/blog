<template>
  <div>
    <div class="row" id='main'>
      <div class="col-2"></div>
      <div class="col-3">
        <postlist @posts='updatePost' :signedin='signedin' :reload='reload'></postlist>
      </div>
      <div class="col-5">
        <postlarge @reload='needReload' :posts='posts' :authuser='authuser' :signedin='signedin'></postlarge>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row" v-if='signedin' id="livechat">
      <div class="container col-12">
        <div id='lcdiv'>
          <h1>Global Live Chat</h1>
          <livechat></livechat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postlarge from '@/components/postLarge'
import postlist from '@/components/postList'
import livechat from '@/components/liveChat'

export default {
  name: 'blog',
  props: ['signedin', 'authuser'],
  data () {
    return {
      posts: [],
      reload: false,
      address: ''
    }
  },
  components: {
    postlarge,
    postlist,
    livechat
  },
  methods: {
    updatePost (value) {
      this.posts = value
    },
    needReload () {
      this.reload = true
      setTimeout(() => {
        this.reload = false
      }, 1000)
    },
    updateAddress (value) {
      this.address = value
    }
  }
}
</script>

<style>

</style>
