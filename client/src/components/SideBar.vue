<template>
  <div>
    <div class="sidebar">
      <h2 v-if="personal">My Article</h2>
      <h2 v-else>Recent Article</h2>
      <li v-if="personal"><div class="ui teal labeled icon button" @click="toogleCreate">
        Create New Article
      <i class="add icon"></i></div>
      <div v-if="addModal"><div class="overlay"></div>
      <article-form class="openform" :addModal="addModal" @addModal="toogleCreate"></article-form></div>
      </li>
      <li v-else><div class="ui icon input card">
        <input type="text" v-model="search" placeholder="Search..." @keyup="getAllArticle(search)">
        <i class="inverted circular search link icon"></i>
      </div></li>
      <ul v-if="personal">
        <li v-for="article in articles" :key="article._id" v-if="article.author.name === me.name">
          <router-link :to='{name:"read", params: {id: `${article._id}`}}'>
            <img :src="article.imageurl" width="150" height="150"/>
            <h3>{{ article.title }} </h3>
            <span>{{ timeDifference(article.createdAt) }}</span>
          </router-link>
          <div class="ui segment" style="padding-left: 54%; border-color: transparent;">
            <router-link :to='{name:"edit", params:{id: article._id}}' style="display:inline">
            <button class="ui teal button">
              Edit
            </button>
            </router-link>
            <button class="ui red button" @click="deleteArticle(article._id)">Delete</button>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li v-for="article in articles" :key="article._id">
          <router-link :to='{name:"article", params: {id: `${article._id}`}}'>
            <img :src="article.imageurl" width="150" height="150"/>
            <h3>{{ article.title }} </h3>
            <span>{{ timeDifference(article.createdAt) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleForm from '@/components/ArticleForm.vue'

export default {
  name: 'side-bar',
  props: ['me', 'personal'],
  components: {
    ArticleForm
  },
  data () {
    return {
      articles: [],
      search: '',
      addModal: false,
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    toogleCreate () {
      this.addModal = !this.addModal
    },
    getAllArticle (input) {
      let self = this
      axios(this.baseurl + '/articles')
        .then(response => {
          let filter = []
          if (input) {
            response.data.articles.forEach(elem => {
              if ((elem.title.toLowerCase()).match(input.toLowerCase()) || (elem.desc.toLowerCase()).match(input.toLowerCase()) || (elem.author.name.toLowerCase()).match(input.toLowerCase())) {
                filter.push(elem)
              }
            })
          } else {
            filter = response.data.articles
          }
          filter.forEach(elem => {
            if (!elem.imageurl) {
              elem.imageurl = '//placehold.it/150x150'
            }
          })
          self.articles = filter
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    deleteArticle (id) {
      axios
        .delete(this.baseurl + `/articles/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          this.$router.push('/blog')
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    timeDifference (previous) {
      let current = new Date()
      var msPerMinute = 60 * 1000
      var msPerHour = msPerMinute * 60
      var msPerDay = msPerHour * 24
      var msPerMonth = msPerDay * 30
      var msPerYear = msPerDay * 365

      var elapsed = current - new Date(previous)
      console.log('sisa', elapsed)

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago'
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago'
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago'
      } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago'
      } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago'
      }
    }
  },
  created () {
    this.getAllArticle()
  }
}
</script>

<style scoped>

.sidebar {
  text-align: left;
  margin-right: 1.5%;
  padding-bottom: 1.5%;
  background: #fff;
  color: #475258;
}
.sidebar h2 {
  font-size: 16pt;
  padding: 0 6% 6%;
  border-bottom: 1px solid #e1e5e7;
}
.sidebar li {
  padding: 6%;
}
.sidebar a {
  display: block;
  text-decoration: none;
  overflow: hidden;
}
.sidebar a img {
  float: left;
  margin-right: 6%;
  display: block;
}
.sidebar a h3 {
  color: #475258;
}
.sidebar a span {
  display: block;
  margin-top: 6%;
  color: #919fa7;
  font-size: 8pt;
}
i.inverted.bordered.icon, i.inverted.circular.icon {
  background-color: #03bb91!important;
  color: #fff!important;
}
.openform {
  position: fixed;
  z-index: 10000;
  top: 10%;
}
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 150%;
  height: 150%;
  background: dimgrey;
  z-index: 1000;
}
ul {
  height: 70vh;
  overflow-y: scroll;
}
</style>
