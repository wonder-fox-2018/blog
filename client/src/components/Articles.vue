<template lang="html">
  <section class="articles">
    
    <div id="maincontainer">
    <div v-for="article in articles" :key="article._id">

      <a class="card-link" href="#">
        <article class="blog-card">
          <!-- <img class="post-image" :src="image" /> -->
          <img class="post-image" src="https://picsum.photos/300/300/?random" />
          <div class="article-details">
            <h4 class="post-category"> Category </h4>
            <h3 class="post-title">{{ article.title }}</h3>
            <p class="post-description">{{ article.content }}</p>
            <p class="post-author">By {{ article.author.firstName+' '+article.author.lastName }}</p>
          </div>
        </article>
      </a>
      <br/>
    </div>
    </div>
  </section>
</template>

<script lang="js">
  import sidebar from './Sidebar'
  export default  {
    name: 'articles',
    props: ['articles'],
    components : {
      sidebar
    },
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="css">

  .articles {
    
  }
  * {
  box-sizing: border-box;
}
*::before, *::after {
  box-sizing: border-box;
}

  #maincontainer{
    max-width: 800px;
    min-width: 600px;
    margin: 0 auto;
    text-align: left;
  }


.blog-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
}
.card-link:hover .post-title {
  transition: color 0.3s ease;
  color: #e04f62;
}
.card-link:hover .post-image {
  transition: opacity 0.3s ease;
  opacity: 0.9;
}

.post-image {
  transition: opacity 0.3s ease;
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid #ebebeb;
}

.post-title {
  transition: color 0.3s ease;
  font-size: 1.125rem;
  line-height: 1.4;
  color: #121212;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid #ebebeb;
}

@media (max-width: 40rem) {

  .blog-card {
    flex-wrap: wrap;
  }
}
@supports (display: grid) {

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}

</style>
