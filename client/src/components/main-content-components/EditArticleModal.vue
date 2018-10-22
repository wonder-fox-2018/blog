<template>
<div class="modal fade" id="modal-edit-article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Article</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="recipient-name" v-model="inputTitle">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateArticle">update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'EditArticleModal',
    props: ['articleId'],
    data() {
        return {
            inputTitle: undefined,
            inputContent: undefined
        };
    },
    methods: {
        populateData() {
            
            this.$server({
                method: 'get',
                url: `article/${this.articleId}`
            }).then((result) => {
                this.inputTitle = result.data.title;
                this.inputContent = result.data.content;
            }).catch((err) => {
                console.log(err);
            });
        },
        updateArticle() {
            this.$server({
                method: 'patch',
                url: `article/${this.articleId}`,
                data: {
                    title: this.inputTitle,
                    content: this.inputContent
                },
                headers: {
                    'access-token' : localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.$emit('fetchNewArticle', result.data._id);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    watch: {
        articleId() {
            this.populateData();
        }
    }
}
</script>

<style>

</style>
