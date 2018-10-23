<template>
    <div class="container">
      <div class="row">
        <!-- Blog Entries Column -->
        <articlelist :article="article"></articlelist>
        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <searchWidget @searchArticle="searchArticle"></searchWidget>
          <!-- Categories Widget -->
          <categories></categories>
          <!-- Side Widget -->
          <list></list>
<!-- Side Widget -->
          <!-- tweeter -->
          <chat></chat>
          <sosialMedia></sosialMedia>
        </div>
      </div>
      <!-- /.row -->
    </div>
</template>

<script>
import chat from '@/components/chat.vue'
import articlelist from '@/components/articlelist.vue'
import searchWidget from '@/components/searchWidget.vue'
import categories from '@/components/categories.vue'
import sosialMedia from '@/components/sosialMedia.vue'
import list from '@/components/list.vue'
export default {
  props : ['article'],
  components : {
    articlelist,
    searchWidget,
    categories,
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
