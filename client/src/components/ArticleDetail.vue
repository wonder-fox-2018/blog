<template>
  <div class="article ui">
    <div class="content" v-if="article.length > 0">
    <div class="image">
      <img :src="article[0].imageurl"/>
    </div>
    <div class="desc">
      <span class="type">
        <i class="fa fa-file-text"></i>
      </span>
      <h1> {{article[0].title}} </h1>
      <span style="color: #03bb91"> {{article[0].author.name}}</span>
      <p style="text-align: left;" v-html="article[0].desc"></p>
      <div class="ui label" v-for="(cat,index) in article[0].category" :key="index">{{cat}}</div>
      <div class="share">
        <ul>
          <li>
            <a href="#"><i class="fa fa-comment"></i> {{article[0].commentlist.length}} Comments</a>
          </li>
          <li><social-sharing :url="`http://localhost:8080${this.$route.fullPath}`" inline-template>
            <div>
              <network network="facebook" class="ui teal button" style="width:120px; padding: 10px 0;">
                <i class="fa fa-fw fa-facebook"></i> Facebook
              </network>
              <network network="googleplus" class="ui teal button" style="width:110px; padding: 10px 0;">
                <i class="fa fa-fw fa-google-plus"></i> Google +
              </network>
              <network network="twitter" class="ui teal button" style="width:100px; padding: 10px 0;">
                <i class="fa fa-fw fa-twitter"></i> Twitter
              </network>
            </div>
          </social-sharing></li>
        </ul>
      </div>
    </div>
    <textarea v-if="isLogin" v-model="type" name="comment" cols="25" rows="8" placeholder="Add your comment"></textarea>
    <button v-if="isLogin" class="ui button segment container teal" @click="createComment">Submit</button>
    <div v-else class="ui segment inverted black"><h3>Login to post comment</h3></div>
    <div v-for="(item, index) in article[0].commentlist" :key="index">
      <div class="ui comments container">
        <div class="comment">
          <a class="avatar">
            <img :src="`https://api.adorable.io/avatars/50/${item.owner.name}`" width="15" height="15">
          </a>
          <div class="content" style="text-align: left;">
            <a class="author"> {{ item.owner.name }} </a>
            <span><div class="metadata">
            <div class="date"> {{ timeDifference(item.createdAt) }} </div>
            </div>
            <a style="float: right; " class="ui red button small" v-if="item.owner.name === me.name" @click="deleteComment(item)">Delete My Comment</a>
            </span>
            <div class="text">
              {{ item.comment }}
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

export default {
  name: 'article-detail',
  props: ['isLogin', 'me'],
  data () {
    return {
      article: [],
      url: undefined,
      type: '',
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    getArticleById () {
      let self = this
      axios(this.baseurl + `/articles/${this.$route.params.id}`)
        .then(response => {
          if (!response.data.article[0].imageurl) {
            response.data.article[0].imageurl = '//placehold.it/800x300'
          }
          self.article = response.data.article
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    createComment () {
      if (this.type) {
        axios({
          method: 'POST',
          url: this.baseurl + `/comments/${this.$route.params.id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            comment: this.type
          }
        })
          .then(response => {
            this.notif = response.data.message
            this.$router.push('/blog')
          })
          .catch(err => {
            console.log('get error', err.response)
            this.$router.push('/blog')
          })
      }
    },
    deleteComment (data) {
      console.log(data)
      axios({
        method: 'DELETE',
        url: this.baseurl + `/comments/${data._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.$router.push('/blog')
        })
        .catch(err => {
          console.log('get error', err.response)
          this.$router.push('/blog')
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
    this.getArticleById()
  }
}
</script>

<style scoped>

.article {
  margin-top: 15px!important;
}

.article .image img {
  min-height: 300px;
  max-height: 600px;
}

content {
  float: right;
  width: 66.5%;
  background: #fff;
}
.image {
  background: #fff;
  position: relative;
  overflow: hidden;
}
.image img {
  position: relative;
  z-index: 0;
  width: 100%;
  display: block;
  height: auto;
  transition: 0.3s;
}
.image img:hover {
  opacity: 0.8;
}
.image span {
  background: #EA6060;
  display: block;
  position: absolute;
  font-size: 16pt;
  width: 20%;
  color: #fff;
  text-align: center;
  padding: 20% 10% 2%;
  transform: rotateZ(-45deg);
  top: -25%;
  left: -20%;
  z-index: 1;
}
.desc {
  position: relative;
  background: #fff;
  padding: 6% 6% 6% 10%;
}
.desc .type {
  display: block;
  background: #03bb91;
  color: #fff;
  font-size: 14pt;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 30px;
  left: 0;
}
.desc h1 {
  font-size: 19pt;
  color: #475258;
  margin-bottom: 3%;
}
.desc p {
  line-height: 1.5em;
  margin-top: 1.5em;
  color: #999;
  font-weight: 300;
}
.desc a {
  color: #EA6060;
  text-decoration: none;
  transition: 0.3s;
}
.desc a:hover {
  color: #9c1515;
}
.share {
  margin-top: 5%;
}
.share li {
  display: inline-block;
  margin-right: 5%;
  font-weight: 300;
}
.share a {
  color: #999;
  transition: 0.3s;
}
.share a i,
.share a:hover {
  color: #03bb91;
}
</style>
