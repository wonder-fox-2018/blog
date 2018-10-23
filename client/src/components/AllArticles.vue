<template>
    <div class="card-columns">
        <div v-for="article in articles" class="card mb-4">
            <div class="card-body">
                <div v-if="isLogin && userEmail === article.author.email" class="d-flex justify-content-end align-items-center mb-4">
                    <i class="fas fa-fingerprint text-danger mr-2" id="btn-fingerprint"></i>
                    Your Article
                </div>
                <EditModal :articleId="article._id" :getarticles="getArticles"></EditModal>
                <h4 class="card-title">{{ article.title }}</h4>
                <p class="card-text">{{ article.description }}</p>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="font-weight-bold ml-5">By {{ article.author.name }}</div>
                    <i class="far fa-comment-alt mr-5" id="comment-symbol"></i>
                </div>
                <button class="btn btn-block font-weight-bold" id="btn-post" @click="goToLink(article._id)">
                    Read More
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import EditModal from '@/components/EditModal.vue'

export default {
    name: 'AllArticles',
    props: ['shouldUpdate', 'isLogin', 'userEmail', 'getarticles'],
    components: {
        EditModal
    },
    data() {
        return {
            articles: [],
            article: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        getArticles: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/articles'
            })
                .then((articles) => {
                    this.articles = articles.data
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        goToLink: function(paramsId) {
            this.$router.push(`/articles/${paramsId}`)
        },
        deleteArticle: function(articleId) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/articles/${articleId}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then((result) => {
                    this.getArticles()
                    this.getarticles()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getArticles()
    },
    watch: {
        shouldUpdate() {
            this.getArticles()
        }
    }
}
</script>

<style>
#btn-edit-delete {
    font-size: 20px;
    cursor: pointer;
}

#btn-fingerprint {
    color: #3a606e;
}
</style>
