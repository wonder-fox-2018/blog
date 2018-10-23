<template>
<div class="card">
  <img :src="myprofile.avatar" style="width:100%">
    <h1>{{myprofile.name}}</h1>
    <p class="title">{{myprofile.email}}</p>
    <p>Blogger</p>
    <p><button>My Article {{myarticle}}</button></p>
    <p><button>My Comment {{mycomment}}</button></p>
    <h1></h1>
</div>
</template>

<script>
import axios from 'axios';
var baseurl='https://blog.agusrr.xyz'

export default {
  data() {
    return {
      myarticle: 0,
      mycomment: 0,
      myprofile: '',
      myimage: localStorage.getItem('avatar') || "https://storage.googleapis.com/ecommerce.agusrr.xyz/1540203578253download.png",
    };
  },
  methods: {
    fetcharticle() {
      const self = this;
      axios(`${baseurl}/articles/my/name`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.myarticle = data.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchcomment() {
      const self = this;
      axios(`${baseurl}/comment`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.mycomment = data.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchprofile() {
      const self = this;
      axios.get(`${baseurl}/users/profile`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          self.myprofile = data.data;
          console.log(self.myprofile);
          localStorage.setItem('data', self.myprofile.name);
          localStorage.setItem('userId', self.myprofile.id);
          self.fetcharticle();
          self.fetchcomment();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    const self = this;
    axios.get(`${baseurl}/users/profile`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((data) => {
        self.myprofile = data.data;
        console.log(self.myprofile);
        localStorage.setItem('data', self.myprofile.name);
        localStorage.setItem('userId', self.myprofile._id);
        if (self.myprofile == '') {
          self.myprofile.avatar = "https://storage.googleapis.com/ecommerce.agusrr.xyz/1540203578253download.png";
        }
        self.fetcharticle();
        self.fetchcomment();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  props: ['refresh', 'comment', 'kabarfinal', 'deletereceived', 'stat', 'berubah'],
  watch: {
    refresh(val) {
      this.fetcharticle();
      this.fetchcomment();
    },
    comment(val) {
      this.fetcharticle();
      this.fetchcomment();
    },
    kabarfinal(val) {
      this.fetcharticle();
      this.fetchcomment();
    },
    deletereceived(val) {
      this.fetcharticle();
      this.fetchcomment();
    },
    stat(val) {
      this.fetcharticle();
      this.fetchcomment();
      this.fetchprofile();
    },
    berubah(val) {
      this.fetcharticle();
      this.fetchcomment();
      this.fetchprofile();
    },
  },

};
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 200px;
        margin: auto;
        text-align: center;
        max-height: 400px;
    }

    .title {
        color: grey;
        font-size: 18px;
    }

    button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
    }

    a {
        text-decoration: none;
        font-size: 22px;
        color: black;
    }

    button:hover, a:hover {
        opacity: 0.7;
    }
</style>
