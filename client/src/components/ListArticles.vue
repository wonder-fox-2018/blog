<template>
    <div>
        <div >
            <div class="card post-preview mb-" style="padding: 10px;" v-for="(article, index) in this.articles" :key="index">
                <div class="card-body p-0">
                        <!-- <div class="col-12 col-md- post-preview-text"> -->
                            <div class="clearfix mb-1">
                                <ul class="list-inline float-md-left mb-md-0">
                                    <li class="list-inline-item text-uppercase text-primary">
                                        <small>News</small>
                                    </li>
                                </ul>
                                <div class="float-md-right small text-muted">{{article.createdAt.slice(0, 10)}}</div>
                            </div>
                            <h3 class="card-title mb-2">
                                <h5 style="font-size: 18px;">{{article.title}}</h5>
                                <p style="font-size: 14px;">{{article.text.slice(0, 140)}}...
                                    <router-link :to="{ path: `/articles/${article._id}`}"><a>Baca Selengkapnya→</a></router-link>


                                </p>
                            </h3>
                            <!-- <router-link :to="{ path: `/articles/${article._id}`}"><a class="btn btn-primary">Read Post →</a></router-link> -->
                        <!-- </div> -->
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import axios from 'axios'
    export default {
        name: 'ListArticle',
        props: [],
        data() {
            return {
                articles: [],
                server: 'http://localhost:3000'
            }
        },
        methods: {
            getAllArticle() {
                axios({
                        method: 'GET',
                        url: `${this.server}/articles`
                    })
                    .then((result) => {
                        console.log(result.data);
                        this.articles = result.data
                    }).catch((err) => {
                        console.log(err);
                    });

            }
        },
        created() {
            this.getAllArticle()
        }
    }
</script>