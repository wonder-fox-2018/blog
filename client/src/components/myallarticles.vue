<template>
    <div class="my-5">
         <br><br><br>
         <router-link to="/detail/newarticles"><i class="add sign box icon">ADD ARTICLES</i></router-link>
        <div class="ui icon message" id="art">
        <i class="inbox icon"></i>
        <div class="content">
          <div class="header">
            All Articles That Avalaible
          </div>
          <p>Get the good blog in your pockets everyday.</p>
        </div>
      </div>

      <div v-for="(data,index) in dataarticle" :key='index'>
        <div class="ui icon message" id="art">
        <i class="file icon"></i>
        <div class="content">
          <div class="header">
            <router-link to='/'>{{data.title}}</router-link>
          </div>
          <img :src=data.imgUrl>
          <div v-html="data.content" class="mb-3"></div>
          <div><strong>Author : {{data.userId.name}}</strong></div>
          <div><strong>Created At : {{data.createdAt}}</strong></div>
          <shared :article="data"></shared>
        </div>

      </div>
        <br><br>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Shared from '@/components/shared.vue';

export default {
  components: {
    Shared,
  },
  data() {
    return {
      dataarticle: [],
    };
  },
  created() {
    const self = this;
    axios.get('http://localhost:3000/articles')
      .then((data) => {
        self.dataarticle = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>

</style>
