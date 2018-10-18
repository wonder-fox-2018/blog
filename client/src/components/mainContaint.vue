<template>
  <div class='main-content'>
    <h3>{{ article.title }}</h3>
    <h6>by {{ article.author.username }}</h6>
    <hr>
      <p>Posted on {{ getDate(article.createdAt) }}</p>
    <div>
      <img id='image' :src=" article.image " alt="">
    </div>
    <hr>
    <div class='paragraf'>
      {{ article.contents }}
    </div>
    <hr>
    <div class='row'>
      <div class='col-sm-4'>
        <i></i>Like &nbsp;  <i></i>Hate
      </div>
      <div class='col-sm-4'>
        Share
      </div>
      <div class='col-sm-4'>
        <i></i> Add Comment
      </div>
    </div>
    <comments></comments>
  </div>
</template>

<script>
  import comments from '@/components/comments.vue';

  export default {
    data() {
      return {
        article: '',
      }
    },
    components: {
      comments
    },
    methods: {
      getArticle(id) {
         console.log(id)
        let self = this
        axios.get(`http://localhost:3000/articles/${id}`)
        .then((result) => {
          console.log(result)
          self.article = result.data
        }).catch((err) => {
          console.log(err)
        });
      },
      getDate(isoDate) {
        let date = new Date(isoDate);
        return date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear();
      }
    },
    created() {
    },
    computed: {
      getParamsId: function() {
        return this.$route.params.id
      }
    },
    watch: {
      getParamsId: function(val) {
        this.getArticle(val)
      }
    }
  }
</script>

<style >
.main-content {
  background-color: white;
}
#image {
  height: 400px;
  width: 100%;
}
.paragraf {
  text-align: justify;
  text-justify: inter-word;
}
</style>