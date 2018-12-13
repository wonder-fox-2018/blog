<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-6 col-12">
          <articlelist :article="article"></articlelist>
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <searchWidget @searchArticle="searchArticle"></searchWidget>
          <list></list>
          <chat></chat>
          <banner></banner>
          <sosialMedia></sosialMedia>
        </div>
      </div>
    </div>
</template>

<script>
import chat from '@/components/chat.vue'
import articlelist from '@/components/articlelist.vue'
import searchWidget from '@/components/searchWidget.vue'
import categories from '@/components/categories.vue'
import sosialMedia from '@/components/sosialMedia.vue'
import list from '@/components/list.vue'
import banner from '@/components/banner.vue'
export default {
  props : ['article'],
  components : {
    articlelist,
    searchWidget,
    categories,
    banner,
    sosialMedia,
    list,
    chat
  },
  methods: {
    searchArticle(value) {
      this.$emit('searchArticle', value)
    },
  },

}
</script>

<style>

</style>
