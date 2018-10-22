<template>
    <article class="forecast">
        <h1>All Articles</h1>
        <div v-for="(data,index) in dataarticle" :key='index'>
            <article class="day-forecast" >
                    <router-link class :to="{ name: 'articles-detail', params: { id: data._id }}"><h2>{{data.title}}</h2></router-link>
                    <img class="imgcontrol" src="https://mbtskoudsalg.com/images/facebook-like-button-png-3.png" width="25" height="25"> {{data.like.length}}
                    <img class="imgcontrol" src="https://banner2.kisspng.com/20180410/krq/kisspng-computer-icons-conversation-comment-5acc48377fc894.5725378415233372715234.jpg" width="25" height="25"> {{data.comments.length}}
                    <img class="imgcontrol" v-if="activeId==data.userId._id" @click="edit(data._id)" src="https://mbtskoudsalg.com/images/edit-a-png-3.png" width="25" height="25">
                    <img class="imgcontrol" v-if="activeId==data.userId._id" @click="deleted(data._id)" src="https://png.icons8.com/metro/1600/delete.png" width="25" height="25">
           </article>
        </div>
    </article>

</template>

<script>
import axios from 'axios';

export default {
  props: ['alldata', 'comment', 'deletereceived', 'berubah'],
  data() {
    return {
      dataarticle: '',
      activeId: localStorage.getItem('userId'),
    };
  },
  watch: {
    alldata(val) {
      if (val) {
        this.dataarticle = val;
      }
    },
    comment(val) {
      this.fetcharticle();
    },
    deletereceived(val) {
      this.fetcharticle();
    },
    berubah(val) {
      this.fetcharticle();
    },
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
          this.$emit('kirimkabar');
          this.fetcharticle();
          this.$router.push('/detail/newarticles');
        })
        .catch((err) => {
          alert('gagal delete data');
        });
    },
    fetcharticle() {
      this.activeId = localStorage.getItem('userId');
      const self = this;
      axios.get('http://localhost:3000/articles')
        .then((data) => {
          self.dataarticle = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetcharticle();
  },
};
</script>

<style scoped>
.imgcontrol{
    padding:3px;
}


.forecast {
    margin: 0;
    padding: .3rem;
    background-color: #eee;
    font: 1rem 'Fira Sans', sans-serif;
    max-width:350px ;
}

.forecast > h1,
.day-forecast {
    margin: .5rem;
    padding: .3rem;
    font-size: 1.1rem;
    max-width: 350  px;
}

.day-forecast {
    background: right/contain content-box border-box no-repeat
        url('/media/examples/rain.svg') white;
}

</style>
