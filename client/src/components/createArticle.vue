<template>
  <div class="ui ten wide column">
    <div class="ui segment form">
      <div class="ui dividing header">Create an article</div>
      <div class="three fields">
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
        <div class="field">
          <label>Image Header :</label>
          <input type="file" @change="imgChange">
        </div>
      </div>
      <div class="field">
          <label>Content of your article :</label>
          <textarea rows="7" v-model="inputDescription"></textarea>
        </div>
    </div>
    <div class="field">
      <button class="ui mini right floated button" @click="createArticle">Submit</button>
      <button class="ui mini right floated button" @click="$router.push({ path: '/' })">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'create-article',
  props: ['listCategories'],
  data() {
    return {
      inputCategory: '',
      inputTitle: '',
      inputDescription: '',
      inputImg: ''
    }
  },
  methods: {
    imgChange(val) {
      this.inputImg = val.target.files[0]
    },
    createArticle() {
      let formData = new FormData()

      formData.append('image', this.inputImg)
      formData.append('title', this.inputTitle)
      formData.append('description', this.inputDescription)
      formData.append('categoryId', this.inputCategory)

      axios
        .post(host + '/article', formData, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          this.$emit('reload-data')
          this.$router.push({ path: '/' })
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
