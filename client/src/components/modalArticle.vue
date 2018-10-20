<template>
  <div class="modal fade" id="modalArticle" tabindex="-1" role="dialog" aria-labelledby="modalArticle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" id="inputTitle" v-model="title"  placeholder="Title ... ">
              </div>
              <div class="form-group col-md-12">
                <label for="inputContent">Content</label>
                <!-- <textarea class="form-control" rows="8" v-model="content"></textarea> -->
                <wysiwyg v-model="content" />
              </div>
              <div class="form-group col-md-12">
                <label for="inputImgUrl">Image</label>
                <input type="text" class="form-control" v-model="img"  placeholder="Img-url ... ">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="addArticle">Add Article</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['getarticle'],
  data(){
    return {
      title : '',
      content : '',
      img : ''
    }
  },
  methods : {
    addArticle : function(){
      self = this
      axios({
        method : 'POST',
        url : 'http://localhost:3000/articles/add',
        headers : {
          token : localStorage.getItem('token')
        },
        data :{
          title : self.title,
          article : self.content,
          img : self.img
        }
      })
      .then(response => {
        console.log(response)
        this.getarticle()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
