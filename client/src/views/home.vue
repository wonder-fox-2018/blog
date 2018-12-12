<template>
    <div class="container">
      <div class="row">
        <articlelist :article="article"></articlelist>
        <div class="col-md-4">
          <searchWidget @searchArticle="searchArticle"></searchWidget>
          <categories></categories>
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
