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
        </div>
         <img class="imgcontrol" @click="edit(data._id)" src="https://mbtskoudsalg.com/images/edit-a-png-3.png" width="25" height="25">
         <img class="imgcontrol" @click="deleted(data._id)" src="https://png.icons8.com/metro/1600/delete.png" width="25" height="25">

      </div>
        <br><br>
      </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataarticle: [],
    };
  },
  created() {
    const self = this;
    axios('http://localhost:3000/articles/my/name', {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((data) => {
        self.dataarticle = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    edit(val) {
      this.$router.push({ name: 'articles-detail', params: { id: val } });
      this.$router.push({ name: 'newarticles', params: { id: val } });
    },
    deleted(val) {
      const self = this;
      axios.delete(`http://localhost:3000/articles/${val}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          this.$emit('kirimdelete');
          this.fetch_article();
        })
        .catch((err) => {
          alert('gagal delete data');
        });
    },
    fetch_article() {
      const self = this;
      axios('http://localhost:3000/articles/my/name', {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.dataarticle = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
};
</script>

<style>

</style>
