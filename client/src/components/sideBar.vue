<template>
  <div class='side-bar'>
    <div class="text py-4" v-for='article in articles'>
      <div class="meta">
        <div><small>{{ article.date }}</small></div>
        <div><a href="#">By {{article.author}}</a></div>
      </div>
      <h3 class="heading"><a href="#">{{article.title}}</a></h3>
      <p>{{article.contents}}...</p>
      <router-link :to="{ path: `/home/${article.id}`}">
        <span id='read' style='color:blue' @click='getReadCounter'>Read more</span>
      </router-link>
      <div class='row'>
        <div class='col-sm-4'>
          <i></i>Likes {{article.likes}}
        </div>
        <div class='offset col-sm-4'></div>
        <div class='col-sm-4'>
          <i></i>Read {{ readCounter }}
        </div>
      </div><hr>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        articles: [],
        title: '',
        contents: '',
        image: '',
        author: '',
        readCounter: 0,
        msg: '',
        success: false,
        error: false
      }
    },
    methods: {
      getArticles() {
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
              author : article.author.username,
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