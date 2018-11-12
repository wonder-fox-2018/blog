<template>
  <div class="ui grid">
    <div class="ui three wide column form">
      <div class="field">
        <select class="ui dropdown" v-model="searchByCategory">
          <option value="">All Categories</option>
          <option v-for="category in listCategories" :value="category._id">{{ category.name }}</option>
        </select>
      </div> 
    </div>
    <div class="ui thirteen wide column form">
      <div class="ui icon fluid input">
        <i class="search icon"></i>
        <input type="text" placeholder="Search article by title..." v-model="searchByTitle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  props: ['listCategories'],
  data() {
    return {
      searchByCategory: '',
      searchByTitle: ''
    }
  },
  watch: {
    searchByCategory() {
      this.$emit('query-category', this.searchByCategory)
    },
    searchByTitle() {
      this.$emit('query-title', this.searchByTitle)
    }
  },
  created() {},
  methods: {}
}
</script>

<style>

</style>
