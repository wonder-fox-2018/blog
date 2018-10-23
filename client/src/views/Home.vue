<template>
  <div class="home">
    <div class="container">
      <!-- <button type="button" @click="hh">cobaa {{ $route.params.id!=undefined }}</button> -->
      <div class="row" style="margin:20px auto">
        <leftside @searchtitle="searchtitle" v-if="isLogin" ></leftside>
        <maincontent v-if="$route.params.id==null"  ref="childcontent" :isLogin="isLogin" :iduser="iduser" :dataArticle="dataArticle" :searchtxt="searchtxt" @parent-edit-task="edittask" @parent-detail="detailarticle" ></maincontent>
        <maindetail v-if="$route.params.id!=undefined" :detailId="detailId" :isLogin="isLogin" :iduser="iduser" :dataArticle="dataArticle" :searchtxt="searchtxt" @parent-edit-task="edittask"></maindetail>
        <updatetaskmodel :idTask="idTask" :refreshContent="refreshContent"></updatetaskmodel>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import leftside from '@/components/LeftSide.vue'
import maincontent from '@/components/MainContent.vue'
import maindetail from '@/components/MainDetail.vue'
import updatetaskmodel from '@/components/UpdateTaskModel.vue'

export default {
  props:['isLogin','dataArticle','iduser','id'],
  name: 'home',
  data() {
    return {
      searchtxt:'',
      idTask:'',
      detailId: ''
    }
  },
  components: {
    leftside,
    maincontent,
    maindetail,
    updatetaskmodel

  },
  methods: {
      hh(){
        console.log(this.$route.params.id)
      },
      refreshContent(){
        this.$refs.childcontent.refreshArticle();
      },
      searchtitle(data){
        //console.log('parent',data)
        this.searchtxt=data
      },
      edittask(data){
        //console.log('parent editid',data)
        this.idTask=data
      },
      detailarticle(data){
        this.detailId=data
      }
  } 
}
</script>
