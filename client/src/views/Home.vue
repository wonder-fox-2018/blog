<template>
  <div class="home">
    <div class="ui container">
      <div class="ui centered grid">
        <user-info :current-user="currentUser" v-if="currentUser" @get-user="$emit('get-user')" :load-new-data="loadNewUserArticle" @reload-data="resetDataUser"/>
        <router-view :current-user="currentUser" :list-articles="listArticles" :list-categories="listCategories" @reload-data="resetDataUser" :load-new-data="loadNewData"/>
        <div class="ui three wide column">
          <button class="ui icon fluid button" v-if="this.$router.history.current.name === 'detail-article'" @click="$router.push('/')">
            <i class="ui left arrow icon"></i>
            back to all article</button>
          <div class="ui segment">
            <h4 class="ui dividing header" style="text-align: center">Recently created Articles</h4>
            <div class="ui middle aligned divided list">
              <div class="item" v-for="article in listArticles">
                <div class="content" style="text-align:center">
                  <a @click="toDetail(article._id)">{{ article.title.slice(0,25) }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'
import userInfo from '@/components/userInfo'

const { host } = config

export default {
  name: 'home',
  props: ['currentUser', 'listArticles', 'listCategories'],
  data() {
    return {
      loadNewUserArticle: false,
      loadNewData: false
    }
  },
  created() {
    console.log()
  },
  components: {
    userInfo
  },
  methods: {
    toDetail(id) {
      this.$router.push('/article/' + id)
      this.resetDataUser()
    },
    resetDataUser() {
      this.$emit('reload-data')
      this.loadNewUserArticle = true
      this.loadNewData = true
      setTimeout(() => {
        this.loadNewData = false
      }, 500)
      setTimeout(() => {
        this.loadNewUserArticle = false
      }, 500)
    }
  }
}
</script>
