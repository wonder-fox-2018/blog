<template>
   <div class="col-sm-8 d-flex flex-column align-items-center">
      <div class="card article-grid" style="width: 100%;" v-for="(article, index) in articles" :key="index">
        <div class="card-body">
          <h3 class="card-title"><b>{{article.title}}</b></h3>
          <h6 class="card-subtitle mb-2 text-muted"> <i>by: {{article.author.first_name}} {{article.author.last_name}}</i></h6>
          <p class="card-text">{{article.content}}</p>
          <div v-if="article.author._id === userId">
            <a href="#" class="card-link"><i class="far fa-comment"></i></a>
            <a class="card-link" @click="editArticle(article._id)" data-toggle="modal" data-target="#modal-edit-article"><i class="far fa-edit"></i></a>
            <a class="card-link" @click="removeArticle(article._id)"><i class="far fa-trash-alt"></i></a>
          </div>
        </div>
      </div>
      <edit-article-modal :articleId="editedArticle" @fetchNewArticle="fetchArticle"></edit-article-modal>
    </div>
</template>

<script>
import EditArticleModal from '@/components/main-content-components/EditArticleModal'

export default {
    name: 'Article',
    components: {
      EditArticleModal
    },
    props: ['isLogin', 'userId', 'updateArticle'],
    data: function() {
        return {
          articles: [],
          editedArticle: undefined
        };
    },
    methods: {
      fetchArticle() {
        this.$server({
          url: '/article',
          method: 'GET'
        }).then((result) => {
          this.articles = result.data.reverse();
        }).catch((err) => {
          console.log(err);
        });
      },
      removeArticle(id) {
        this.$server({
          method: 'DELETE',
          url: `/article/${id}`,
          headers: {
            'access-token': localStorage.getItem('access-token'),
          },
        }).then((result) => {
          console.log(result);
          this.fetchArticle();
          this.$emit('updateProfile', id);
        }).catch((err) => {
          console.log(err);
        });
      },
      editArticle(id) {
        console.log('edit');
        this.editedArticle = id;
        console.log(this.editedArticle, 'done');
      }
    },
    watch: {
      updateArticle() {
        this.fetchArticle();
      }
    },
    created() {
      console.log(this.articles);
      this.fetchArticle();
      console.log(this.articles);
    },
};
</script>

<style scoped>
    .article-grid {
        margin-top: 3%;
        margin-bottom: 3%;
        border-bottom: solid 1px;
    }

    .article-grid:hover {
      background-color: rgba(12, 12, 12, 0.068);
      border: 1px solid;
    }

    a:hover {
      cursor: pointer;
      color: darkblue;
    }
</style>
