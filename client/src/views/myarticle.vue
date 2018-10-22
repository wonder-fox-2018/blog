<template>
  <div class="container">
      <div class="row">
          <div class="col-md-8">
            <router-view :updatecomponent="updatecomponent"></router-view>
          </div>
          <div class="col-md-4">
            <addArticle v-if="isLogin" ></addArticle>
            <categories></categories>
            <list></list>
            <banner></banner>
            <sosialMedia></sosialMedia>
          </div>
        </div>
  </div>
</template>

<script>
import config from '@/config.js'
import addArticle from '@/components/addArticle.vue'
import categories from '@/components/categories.vue'
import sosialMedia from '@/components/sosialMedia.vue'
import banner from '@/components/banner.vue'
import list from '@/components/list.vue'
export default {
  props:['id', 'isLogin', 'updatecomponent'],
  components : {
    addArticle,
    categories,
    sosialMedia,
    banner,
    list
  },
  // methods: {
  //   searchArticle(value) {
  //     console.log(value, 'ini dari home')
  //     this.$emit('searchArticle', value)
  //   },
  // },
}
</script>

