<template>
  <div>
    <br><br><br>
        <div class="ui grid">
          <div id="nav" class="ui five wide column">
            <button><router-link to="/articles">All Articles</router-link></button>
            <button><router-link to="/myarticles">My Articles</router-link></button>
          <sidebar :perubahan="ismin" :kirimdata="article" :statupload='isupload' :refresh="isrefresh" :comment="iscomment"></sidebar>
          </div>
          <div class="ui ten wide column">
              <router-view @minify="mini" @updateavatar="hello" @addcomment="kasihtau" @periksalagi="renderulang"></router-view>
          </div>
        </div>
   </div>
</template>
<script>
import Sidebar from '@/components/sidebar.vue';
import axios from 'axios';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      article: '',
      isrefresh: false,
      iscomment: false,
      iskirim: false,
      isupload: false,
      ismin: false,
    };
  },
  methods: {
    renderulang() {
      this.fetchArticle();
      this.isrefresh = !this.isrefresh;
    },
    fetchArticle() {
      const self = this;

      axios.get('http://localhost:3000/articles')
        .then((data) => {
          self.article = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    kasihtau() {
      this.iscomment = !this.iscomment;
    },
    hello() {
      this.isupload = !this.isupload;
    },
    mini() {
      this.ismin = !this.ismin;
    },
  },
  created() {
    if(localStorage.getItem('token')){
        this.$router.push('/detail/newarticles');
    }
    else{
        this.$router.push('/');
    }
  },
  mounted() {
    if(localStorage.getItem('token')){
        this.$router.push('/detail/newarticles');
    }
    else{
        this.$router.push('/');
    }
    
  }
};
</script>
