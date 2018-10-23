<template>
    <div>
<br><br><br>
    <h1>HALO INI HALAMAN SEARCH</h1>
    <div class="ui icon message" id="art">
        <i class="inbox icon"></i>
        <div class="content">
          <div class="header">
            Articles Detail
          </div>
          <p>Get the good blog in your pockets everyday.</p>
        </div>
    </div>
        <div  v-for="(data,index) in render" :key="index" class="ui icon message" id="art">
        <i class="file icon"></i>
        <div class="content">
            <div class="header">
              <router-link to='/'>{{data.title}}</router-link>
            </div>
            <img :src=data.imgUrl>
            <div v-html="data.content" class="mb-3"></div>
            <div><strong>Author :{{data.userId.name}}</strong></div>
            <div><strong>Created At :{{data.createdAt}}</strong></div>
        </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
var baseurl='https://blog.agusrr.xyz'
export default {
  data() {
    return {
      render: [],
    };
  },
  methods: {
    dapetgak() {
      axios.get(`${baseurl}/articles/search/${this.search}`)
        .then((data) => {
          this.render = data.data;
          console.log(hasil);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: ['search'],
  watch: {
    search() {
      this.dapetgak();
    },
  },
};
</script>

<style>

</style>
