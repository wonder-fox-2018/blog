<template>
  <div>
    <div class="blog-card" v-for="article in articles" :key="article._id">
      <div class="meta">
        <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
        <router-link to='/about' class="details">Read More</router-link>
      </div>
      <div class="description">
        <h1> {{ article.title }} </h1>
        <h2> {{ article.author.name }} </h2>
        <p> {{ article.desc.substring(0, 150) }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'side-bar',
  data () {
    return {
      articles: [],
      baseurl: 'http://localhost:3000'
    }
  },
  methods: {
    getAllArticle () {
      let self = this
      axios (this.baseurl + '/articles')
      .then(response => {
        console.log('all article', response.data.articles)
        self.articles = response.data.articles
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  created() {
    this.getAllArticle()
  },
}
</script>

<style scoped>

.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  min-height: 220px;
  box-shadow: 1px 4px 7px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #fff;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #5ad67d;
}
.blog-card:hover .photo {
  -webkit-transform: scale(1.3) rotate(3deg);
          transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: -webkit-transform .2s;
  transition: transform .2s;
  transition: transform .2s, -webkit-transform .2s;
}
.blog-card .details {
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  transition: left .2s;
  background: rgba(0, 0, 0, 0.6);
  color: whitesmoke;
  padding: 43% 10px;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
}
.blog-card .details a {
  -webkit-text-decoration: dotted underline;
          text-decoration: dotted underline;
}

.blog-card .description {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}

.blog-card .description h1 {
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #a2a2a2;
  margin-top: 5px;
}

.blog-card p {
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #5ad67d;
  width: 35px;
  top: -0.75rem;
  left: 41%;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}

</style>
