<template>
    <div>
        <div class="sticky-top">
            <div class="card post-preview mb-" style="padding: 10px;">
                <div class="card-body p-0">
                    <div class="clearfix mb-1">
                        <ul class="list-inline float-md-left mb-md-0">
                            <li class="list-inline-item text-uppercase text-primary">
                                <small>article</small>
                            </li>
                        </ul>
                        <div class="float-md-right small text-muted">{{article.createdAt.slice(0, 10)}}</div>
                    </div>
                    <h3 class="card-title mb-2">
                        <h5 style="font-size: 18px;">{{article.title}}</h5>
                        <p style="font-size: 14px;">{{article.text.slice(0, 140)}}...
                            <router-link  :user="user" :to="{ path: `/articles/${article._id}`}">
                                <a>Baca Selengkapnya→</a>
                            </router-link>
                        </p>
                    </h3>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import axios from 'axios'
    export default {
        name: 'ListArticle',
        props: ['user', 'article'],
        data() {
            return {
                // server: 'http://localhost:3000',
                // editTitle: '',
                // editImg: '',
                // editText: '',
                // authorId: '',
                // editId: ''
            }
        },
        methods: {
            // getDetail(id){
            //     axios({
            //         method: 'GET',
            //         url: `${this.server}/articles/${id}`
            //     })
            //     .then((result) => {
            //         // console.log('getdetail', result.data);
            //         this.editTitle = result.data.title
            //         this.editImg = result.data.img
            //         this.editText = result.data.text
            //         this.editId = result.data._id
            //         this.authorId = result.data.author._id
            //     }).catch((err) => {
            //         console.log(err);
            //     });
            // }
        }
    }
</script>