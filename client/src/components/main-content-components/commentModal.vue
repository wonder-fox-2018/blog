<template>
<div class="modal fade" id="modal-comment-article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
                    </div>
                </form>
                <button type="button" class="btn btn-primary" @click="addComment">comment</button>
            </div>
            <div class="modal-footer">

                <div class="card article-grid" style="width: 100%;" v-for="(comment, index) in comments" :key="index">
                    <div class="card-body">
                        <p class="card-text">{{comment.content}}</p><br>
                        <h6 class="card-subtitle mb-2 text-muted"> <i>{{comment.user.first_name}}
                                {{comment.user.last_name}}</i></h6>
                        <h6 class="card-subtitle mb-2 text-muted"> <i> {{new Date(comment.createdAt).getDate()}}-{{new
                                Date(comment.createdAt).getMonth() + 1}}-{{new Date(comment.createdAt).getFullYear()}}
                            </i></h6><br>

                        <div v-if="comment.user._id === userId">
                            <a class="card-link" @click="removeComment(comment._id)"><i class="far fa-trash-alt"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CommentModal',
    props: ['articleId', 'userId'],
    data() {
        return {
            inputContent: '',
            comments: []
        }
    },
    created() {

    },
    methods: {
        fetchComment: function() {
            this.$server({
                method: 'GET',
                url: `/comment/${this.articleId}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.comments = result.data.reverse();
            }).catch((err) => {
                console.log(err);
            });
        },
        addComment() {
            this.$server({
                method: 'POST',
                url: `/comment/${this.articleId}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                data: {
                    content: this.inputContent
                }
            }).then((result) => {
                //console.log(result);
                this.inputContent = '';
                this.fetchComment();
            }).catch((err) => {
                console.log(err);
            });
        },
        removeComment(id) {
            this.$server({
                method: 'DELETE',
                url: `/comment/${this.articleId}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                data: {
                    id: id
                }
            }).then(() => {
                this.fetchComment();
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    watch: {
        articleId() {
            
            this.fetchComment();
        }
    }
}
</script>

<style scoped>
    .modal-footer {
        display: flex !important;
        flex-direction: column !important;
    }
</style>
