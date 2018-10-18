<template>
  <div class="home">
    <div class="container">
      <div class="row" style="margin:20px auto">
        <leftside @searchtitle="searchtitle" v-if="isLogin" ></leftside>
        <maincontent  ref="childcontent" :isLogin="isLogin" :dataArticle="dataArticle" :searchtxt="searchtxt" @parent-edit-task="edittask"></maincontent>
        <updatetaskmodel :idTask="idTask" :refreshContent="refreshContent"></updatetaskmodel>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import leftside from '@/components/LeftSide.vue'
import maincontent from '@/components/MainContent.vue'
import updatetaskmodel from '@/components/UpdateTaskModel.vue'

export default {
  props:['isLogin','dataArticle'],
  name: 'home',
  data() {
    return {
      searchtxt:'',
      idTask:'',
    }
  },
  components: {
    leftside,
    maincontent,
    updatetaskmodel

  },
  methods: {
      refreshContent(){
          console.log('coba parent')
           this.$refs.childcontent.refreshArticle();
      },
      searchtitle(data){
        console.log('parent',data)
        this.searchtxt=data
      },
      edittask(data){
        console.log('parent editid',data)
        this.idTask=data
      }
  }      
}
</script>
