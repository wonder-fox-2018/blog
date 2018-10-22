<template>
  <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Edit Article : {{id}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" v-model="title"  placeholder="Title ... ">
              </div>
              <div class="form-group col-md-12">
                <label for="inputContent">Content</label>
                <!-- <textarea class="form-control" rows="8" v-model="content"></textarea> -->
                <wysiwyg v-model="content" />
              </div>
              <div class="form-group">
                <label for="sel1">Select list:</label>
                <select class="form-control" v-model="category">
                  <option>Manga</option>
                  <option>Manwa</option>
                  <option>Manhua</option>
                  <option>Anime</option>
                  <option>Gunpla</option>
                  <option>Figure</option>
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
          <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="updateArticle">Update Article</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  props : ['id', 'getmylist'],
  data(){
    return {
      title : '',
      content : '',
      category : '',
      img : ''
    }
  },
  watch: {
    id() {
      this.getArticle()
    },
  },
  created : function(){
    // this.getArticle()
  },
  methods : {
    getArticle(){
      axios({
        method : 'GET',
        url : `${config.port}/articles/show/${this.id}`,
        headers:{
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        let data = response.data.article
        this.title = data.title
        this.content = data.article
        this.category = data.category
        this.img = data.img
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateArticle(){
      axios({
        method : 'PUT',
        url : `${config.port}/articles/update/${this.id}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          title : this.title,
          content : this.content,
          category : this.category,
          img : this.img
        }
      })
      .then(response => {
        this.getmylist()
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
