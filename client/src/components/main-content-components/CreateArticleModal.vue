<template>
<div class="modal fade" id="modal-create-article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Article</h5>
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
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addArticle">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CreateArticleModal',
    data() {
        return {
            inputTitle: '',
            inputContent: '',
        };
    },
    methods: {
        addArticle() {
            this.$server({
                method: 'POST',
                url: '/article',
                data: {
                    title: this.inputTitle,
                    content: this.inputContent,
                },
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.inputTitle = '';
                this.inputContent = '';
                this.$emit('updateArticle', result.data._id);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>
