<template>
<div>
<br><br><br>
    <div class="ui icon message" id="art">
        <i class="inbox icon"></i>
        <div class="content">
          <div class="header">
            Articles Detail
          </div>
          <p>Get the good blog in your pockets everyday.</p>
        </div>
    </div>
        <div class="ui icon message" id="art">
        <i class="file icon"></i>
        <div class="content">
            <div class="header">
              <router-link to='/'>{{data[0]['title']}}</router-link>
            </div>
            <img :src=data[0].imgUrl>
            <div v-html="data[0].content" class="mb-3"></div>
            <div><strong>Author : {{data[0].userId.name}}</strong></div>
            <div><strong>Created At : {{data[0].createdAt}}</strong></div>
        </div>
        </div>

       <div>  <wysiwyg v-model="commit" /> <br>
                 <button type="submit" class="btn btn-success" @click="comment">Submit</button>
       </div>

       <div v-for="(data,index) in data[0].comments" :key='index'>
        <div class="content">

          <div class="ui icon message">
              <i class="comment icon"></i>
              <h3>by : {{data.userId.name}}</h3>
              <p v-html="data.comment"></p>

               <img v-if="data.userId._id==activeId" class="imgcontrol" @click="deleted(data._id)" src="https://png.icons8.com/metro/1600/delete.png" width="25" height="25">
          </div>
        </div>
      </div>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commit: '',
      data: [],
      activeId: localStorage.getItem('userId'),
    };
  },
  created() {
    const self = this;
    axios(`http://localhost:3000/articles/${this.$route.params.id}`)
      .then((data) => {
        self.data = data.data;
        console.clear();
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    comment() {
      const self = this;
      axios.post(`http://localhost:3000/comment/${this.$route.params.id}`, {
        comment: this.commit,
      }, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.fetchdata();
          self.commit = '';
          this.$emit('addcomment');
        })
        .catch((err) => {
          alert('gagal');
        });
    },
    fetchdata() {
      const self = this;
      axios.get(`http://localhost:3000/articles/${this.$route.params.id}`)
        .then((data) => {
          self.data = data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleted(val) {
      const self = this;
      axios.delete(`http://localhost:3000/comment/${val}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.fetchdata();
          this.$emit('minify');
        })
        .catch((err) => {
          alert('gagal');
        });
    },
  },
  watch: {
    $route(val) {
      const self = this;
      axios(`http://localhost:3000/articles/${this.$route.params.id}`)
        .then((data) => {
          self.data = data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style>

</style>
