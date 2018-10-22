<template>
<div class="col-sm-8 d-flex flex-column align-items-center">
    <div class="card article-grid" style="width: 100%;">
        <div class="card-body">
            <h3 class="card-title"><b>{{article.title}}</b></h3>
            <h6 class="card-subtitle mb-2 text-muted"> <i>by: {{article.author.first_name}}
                    {{article.author.last_name}}</i></h6>
             <h6 class="card-subtitle mb-2 text-muted"> <i> {{new Date(article.createdAt).getDate()}}-{{new Date(article.createdAt).getMonth() + 1}}-{{new Date(article.createdAt).getFullYear()}}
                    </i></h6><br>
            <p class="card-text">{{article.content}}</p>
        </div>
    </div>
    <edit-article-modal :articleId="article._id" @fetchNewArticle="fetchArticle"></edit-article-modal>
</div>
</template>

<script>
import EditArticleModal from '@/components/main-content-components/EditArticleModal'

export default {
    name: 'DetailArticle',
    props: ['userId'],
    components: {
        EditArticleModal
    },
    data() {
        return {
            article: undefined
        }
    },
    created() {
        this.articleId = this.$route.params.id
       
        this.fetchArticle();
        
    },
    mounted() {
        if (localStorage.getItem('access-token') === null) {
            this.$router.push('/')
        }
    },
    methods: {
        fetchArticle: function() {
            this.$server({
                method: 'GET',
                url: `/article/${this.$route.params.id}`
            }).then((result) => {
                
                this.article = result.data;
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
            }).then(() => {
               this.$router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    watch: {
        '$route.params.id'() {
            this.fetchArticle();
        }
    }
}
</script>

<style scoped>
    .card {
        height: 500px;
    }
    
    .col-sm-8 {
        justify-content: center;
        align-items: center;
    }
</style>
