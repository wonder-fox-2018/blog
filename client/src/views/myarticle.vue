<template>
  <div class="container">
      <div class="row">
          <div class="col-md-8">
            <h1>This is an my article page</h1>
            <router-view></router-view>
          </div>
          <div class="col-md-4">
            <addArticle v-if="isLogin"></addArticle>
            <!-- <searchWidget @searchArticle="searchArticle"></searchWidget> -->
            <categories></categories>
            <list></list>
            <banner></banner>
            <sosialMedia></sosialMedia>
          </div>
        </div>
  </div>
</template>

<script>
import addArticle from '@/components/addArticle.vue'
import searchWidget from '@/components/searchWidget.vue'
import categories from '@/components/categories.vue'
import sosialMedia from '@/components/sosialMedia.vue'
import banner from '@/components/banner.vue'
import list from '@/components/list.vue'
export default {
  props:['id', 'isLogin'],
  components : {
    addArticle,
    searchWidget,
    searchWidget,
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

