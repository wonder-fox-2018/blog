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
          <banner></banner>
          <!-- tweeter -->
          <sosialMedia></sosialMedia>
        </div>
      </div>
      <!-- /.row -->
    </div>
</template>

<script>

import articlelist from '@/components/articlelist.vue'
import searchWidget from '@/components/searchWidget.vue'
import categories from '@/components/categories.vue'
import sosialMedia from '@/components/sosialMedia.vue'
import banner from '@/components/banner.vue'
import list from '@/components/list.vue'
export default {
  props : ['article'],
  components : {
    articlelist,
    searchWidget,
    categories,
    sosialMedia,
    banner,
    list
  },
  methods: {
    searchArticle(value) {
      console.log(value, 'ini dari home')
      this.$emit('searchArticle', value)
    },
  },

}
</script>

<style>

</style>
