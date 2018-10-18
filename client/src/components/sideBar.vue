<template>
  <div class='side-bar'>
    <br>
    <div>
      <i class="fa fa-search"></i>
      <input type="text" class="form-group" placeholder="Search by title.." @keyup='searchArticle' v-model='query'>
      <div class='row'>
        <div class='col-sm-12'>
          <button class='btn-sm btn-dark' v-if='isLogin' @click='showMyArticles'>Show my articles only</button>
        </div>
        <div class='col-sm-12'>
          <button class='btn-sm btn-light' v-if='isLogin' @click='getArticles'>Show all articles</button>
        </div>
      </div>
    </div>
    <div class="text py-4" v-for='article in articles'>
      <div class="meta">
        <div><small>{{ article.date }}</small></div>
        <div><a href="#">By {{article.author.username}}</a></div>
      </div>
      <h3 class="heading"><a href="#">{{article.title}}</a></h3>
      <p v-html='article.contents'>...</p>
      <router-link :to="{ path: `/home/${article.id}`}">
        <span id='read' style='color:blue' @click='getReadCounter'>Read more</span>
      </router-link>
      <div class='row'>
        <div class='col-sm-4'>
          <i class="fa fa-heart"></i> Likes {{article.likes}}
        </div>
        <div class='offset col-sm-4'></div>
        <div class='col-sm-4'>
          <i class="fa fa-eye" aria-hidden="true"></i> Read {{ readCounter }}
        </div>
      </div><hr>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['isLogin', 'userId'],
    data() {
      return {
        articles: [],
        title: '',
        contents: '',
        image: '',
        author: '',
        query: '',
        readCounter: 0,
        mine: false,
        msg: '',
        success: false,
        error: false
      }
    },
    methods: {
      getArticles() {
        this.articles = []
        let self = this
        axios.get('http://localhost:3000/articles')
        .then((result) => {
          result.data.forEach(article=>{
            let summary = article.contents.slice(0,100)
            let data = {
              id: article._id,
              title : article.title,
              contents : summary,
              image : article.image || 'http://3.bp.blogspot.com/-Iw7UP2Mpisw/T1iKZIDTy4I/AAAAAAAAcy0/gVvpFmbNp00/s1600/Stationary+Pen+Pencil+(7).jpg',
              author : article.author,
              likes: article.likes,
              read: article.watched,
              date : article.createdAt || new Date
            }
            self.articles.push(data)
          })
          // console.log(self.articles)
        }).catch((err) => {
          console.log(err)
        });
      },
      searchArticle() {
        let self = this
        let arr = []
        if(this.query) {
          this.articles.forEach(article=>{
            if(article.title.toLowerCase().indexOf(this.query) !== -1) {
              arr.push(article)
            }
          })
          this.articles = arr
        } else {
          this.articles = []
          this.getArticles()
        }
      },
      showMyArticles() {
        let arr = []
        this.articles.forEach(article=>{
          if(article.author._id === localStorage.getItem('userId')) {
            arr.push(article)
          }
        })
        this.articles = arr
      }
    },
    computed: {
      getReadCounter: function() {
        console.log('read')
        return this.readCounter++
      }
    },
    created() {
      this.getArticles()
    },
  }
</script>

<style >
  .side-bar {
    background-color: whitesmoke;
  }
  #read:hover{
    color: slateblue;
    background-color: whitesmoke;
    cursor: pointer;
  }
</style>