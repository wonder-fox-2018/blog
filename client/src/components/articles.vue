<template>
  <div class="ui ten wide column">
    <div class="ui fluid link card" v-for="article in listArticles" @click="$router.push({path: `article/${article._id}`})">
      <div class="ui slide masked reveal image">
        <img :src="article.imgHeader" style="object-fit: contain;width: 100%; height:140px">
      </div>
      <div class="content">
        <a class="header">{{ article.title }}</a>
        <div class="meta">
          <span class="date">Created in {{ new Date(article.createdAt).getDate() }} - {{ new Date(article.createdAt).getMonth() + 1 }} - {{ new Date(article.createdAt).getFullYear() }}</span>
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="comment icon"></i>
          {{ article.commentId.length }} Comments
        </a>
        <div class="ui mini right floated button">
          {{article.categoryId.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articles',
  props: ['currentUser', 'listArticles'],
  data() {
    return {
      myArticles: []
    }
  },
  methods: {}
}
</script>

<style>

</style>
