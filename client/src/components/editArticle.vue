<template>
  <div class="ui ten wide column">
    <div class="ui segment form">
      <div class="ui dividing header">Update an article</div>
      <div class="two fields">
        <div class="field">
          <label>Title :</label>
          <input type="text" v-model="inputTitle">
        </div>
        <div class="field">
          <label>Category :</label>
          <select class="ui dropdown" v-model="inputCategory">
            <option v-for="category in listCategories" :value="category._id">{{ category.name }}</option>
          </select>
        </div>
      </div>
      <div class="field">
          <label>Content of your article :</label>
          <textarea rows="7" v-model="inputDescription"></textarea>
        </div>
    </div>
    <div class="field">
      <button class="ui mini right floated button" @click="updateArticle">Submit</button>
      <button class="ui mini right floated button" @click="$router.push({ path: '/article/'+ paramsId })">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'edit-article',
  props: ['listCategories'],
  data() {
    return {
      paramsId: this.$router.history.current.params.id,
      article: '',

      inputTitle: '',
      inputCategory: '',
      inputDescription: ''
    }
  },
  created() {
    this.getArticle(this.$router.history.current.params.id)
  },
  methods: {
    updateArticle() {
      axios({
        url: host + '/article/' + this.paramsId,
        method: 'put',
        data: {
          title: this.inputTitle,
          categoryId: this.inputCategory,
          description: this.inputDescription
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$router.push({ path: '/article/' + this.paramsId })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getArticle(id) {
      axios({
        url: host + '/article/' + id,
        method: 'get'
      })
        .then(data => {
          this.article = data.data.data
          this.inputTitle = data.data.data.title
          this.inputCategory = data.data.data.categoryId._id
          this.inputDescription = data.data.data.description
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
