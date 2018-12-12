<template>
  <div class="modal fade" id="modalArticle" tabindex="-1" role="dialog" aria-labelledby="modalArticle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Create Article</h5>
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
              <div class="form-group">
                <label for="sel1">Select list:</label>
                <select class="form-control" v-model="category" id="sel1">
                  <option>Puisi</option>
                  <option>Cerita</option>
                  <option>Lirik</option>
                  <option>Info</option>
                </select>
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
import config from '@/config.js'
export default {
  props : ['getarticle', 'updatecomponent'],
  data(){
    return {
      title : '',
      content : '',
      category : '',
      img : ''
    }
  },
  methods : {
    addArticle : function(){
      self = this
      axios({
        method : 'POST',
        url : `${config.port}/articles/add`,
        headers : {
          token : localStorage.getItem('token')
        },
        data :{
          title : self.title,
          article : self.content,
          category : self.category,
          img : self.img || 'https://www.finansialku.com/wp-content/uploads/2018/01/Gambar-Tipografi-01-Finansialku.jpg'
        }
      })
      .then(response => {
        this.title = ''
        this.article = ''
        this.category = ''
        this.img = ''
        console.log(response)
        this.getarticle()
        this.updatecomponent()
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
