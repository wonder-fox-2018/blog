<template>
    <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="input_search" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="runSearch()">Go!</button>
                    </span>
                </div>
            </div>
        </div>

        <!-- Categories Widget -->
        <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-2" v-for="(category, index) in all_categories" :key="index">
                                <button class="btn-sm button-light" @click="getByCategory(category._id)" >{{category.name}}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Side Widget -->
        <global-chat></global-chat>
    </div>
</template>

<script>
import config from '@/config.js'
import GlobalChat from '@/components/GlobalChat.vue'

export default {
  name: 'Sidebar',
  data () {
    return {
      input_search: '',
      all_categories: '',

      category_result: ''
    }
  },
  components : {
    GlobalChat
  },
  methods: {
    runSearch () {
      let self = this
      axios({
        method: 'GET',
        url: `${config.port}/articles/search?keyword=${self.input_search}`
      })
        .then((response) => {
          self.$emit('search-result', response.data.data)
          console.log(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategories () {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/categories/`
      })
        .then((response) => {
          self.all_categories = response.data
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getByCategory (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/articles/bycategory/${id}`
      })
        .then((response) => {
          console.log(response.data.data)

          self.$emit('category-result', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getCategories()
  }
}
</script>

<style>

</style>
