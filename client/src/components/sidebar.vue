<template>
    <div id="siap" class="my-5 align-items-center" style="padding=20px">
         <br><br>
        <profile :berubah="perubahan" :kabarfinal="iskirim" :refresh="refresh" :comment="comment" :stat="statupload"></profile>
        <br><br>
        <router-link to="/detail/newarticles"><i class="add sign box icon">ADD ARTICLES</i></router-link>
        <br><br>
        <router-link to="/detail/edituser"><i class="add sign box icon">UPDATE USER</i></router-link>
        <br><br>
        <router-link to="/detail/chatroom"><i class="add sign box icon">CHATROOM</i></router-link>
        <div class="ui icon message">
        <i class="inbox icon"></i>
        <div class="content">
          <div class="header">
            Welcome To My Blog
          </div>
          <p>Get the good blog in your pockets everyday.</p>
        </div>
      </div>
        <h1>WELCOME TO MY BLOG</h1>
           
      <article-card :berubah="perubahan" :comment="comment" @kirimkabar='kabari' :alldata="kirimdata"></article-card>
      </div>
</template>
<script>
import ArticleCard from '@/components/articlecard.vue';
import profile from '@/components/profile.vue';

export default {
  components: {
    ArticleCard,profile
  },
  props:['kirimdata','refresh','comment','kirim','statupload','perubahan'],
  data(){
    return{
        iskirim:false
    }
  },
  methods:{
    kabari(){
      this.iskirim=!this.iskirim
    }
  }
};
</script>
<style>
</style>
