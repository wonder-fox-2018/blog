<template>
    <div class="container" >
        <h4 class="mb-2">Comments</h4>
        <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="text"></textarea>
            <button class="btn btn-sm btn-primary" @click="comment">comment</button>
        </div> <hr>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'addComment',
    props: ['user', 'articleId'],
    data(){
        return {
            server: 'http://localhost:3000',
            text: ''
        }
    },
    methods: {
        comment(){            
            axios({
                method: 'POST',
                url: `${this.server}/comments`,
                headers: {
                    token: localStorage.getItem('blogToken')
                },
                data: {
                    comment: this.text,
                    articleId: this.articleId
                }
            })
            .then((result) => {
                this.text = ''
                console.log('comment sukses', result);                
                this.$emit('get-article')
            }).catch((err) => {
                console.log(err);
                
            });
            
        }
    }
}
</script>
<style>

</style>
