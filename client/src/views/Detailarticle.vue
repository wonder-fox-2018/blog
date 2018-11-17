<template>
    <div>
        <h1>Detail Article</h1>
        <div>
            <div style="width: 40rem;" class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">{{ detailarticle.title }}</button>
                    <br>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        <a class="linkedin" v-on:click.prevent="openLinkedin">
                        <i class="fa fa-linkedin"></i></a>
                      </div>
                      <div class="col-md-4">
                        <a class="twitter" v-on:click.prevent="openTwitter">
                        <i class="fa fa-twitter"></i></a>
                      </div>
                      <div class="col-md-4">
                        <a class="googleplus" v-on:click.prevent="openGplus">
                        <i class="fa fa-google-plus"></i></a>
                      </div>
                    </div>
                    <div v-if="token !== null && token !== '' && detailarticle.author._id === userbasicinfo.userid">
                        <router-link :to="{name: 'editarticle', params: {id: id }}">
                          <button type="button" class="btn btn-warning">
                          Edit</button>
                        </router-link>
                        <button type="button" class="btn btn-danger"
                          v-on:click="deletearticle()">
                          Delete</button>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <p class="card-text">Author: {{ authorname }}</p>
                    <hr>
                    <br>
                    <p><b>Description:</b></p>
                    <br>
                    <br>
                    {{ detailarticle.description }}
                    <hr>
                    <p class="card-text"><b>Comments: </b></p>
                    <hr>
                    <div v-if="detailarticle.listcomments.length !== 0">
                      <div class="row"
                        v-for="(comment,index) in detailarticle.listcomments" :key="index">
                          <div class="col-md-2">
                            <span class="badge badge-secondary">{{ comment.comentator }} </span>
                          </div>
                          <div class="col-md-7">
                            <p>{{ comment.content }}</p>
                          </div>
                          <div class="col-md-1">
                             <div v-if= "comment.userid == userbasicinfo.userid && token !== '' && token !== null">
                              <span type="button" class="btn btn-danger" v-on:click= "deletecomment(comment._id)">Delete</span>
                            </div>
                          </div>
                          <br>
                          <br>
                          <hr>
                      </div>
                    </div>
                    <div v-else>
                      <p>No comment available</p>
                    </div>
                    <hr>
                    <div v-if= "token !== '' && token !== null ">
                      <h4>Add comment</h4>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Comment</label>
                                <textarea class="form-control" rows="5" id="comment" placeholder="Add feedback" v-model= "newcomment"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click= "addcomment()">Add Comment</button>
                        </form>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'Detailarticle',
  props: ['id', 'islogin', 'userbasicinfo', 'listarticles', 'getallarticle', 'token'],
  data () {
    return {
      detailarticle: {},
      authorname: '',
      newcomment: ''
    }
  },
  methods: {
    openTwitter() {
      window.open(
        `https://twitter.com/intent/tweet?status=${
          this.twit ? this.twit : this.detailarticle.title
        }`,
        "popup",
        "width=500,height=300"
      );
    },
    openGplus() {
      window.open(
        `https://plus.google.com/share?url=${this.detailarticle.title}`,
        "popup",
        "width=400,height=400"
      );
    },
    openLinkedin() {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${
          this.detailarticle.title
        }&title=${this.detailarticle.title}`,
        "popup",
        "width=600,height=600"
      );
    },
    getdetailarticle () {
      let self = this
      axios({
        method: 'GET',
        url: `http://localhost:3009/articles/${self.id}`
      })
        .then(article => {
          let detailarticle = article.data.data
          self.authorname = detailarticle.author.name
          self.detailarticle = article.data.data
        })
        .catch(error => {
          console.log('ERROR Getting Detail Article ', error)
        })
    },
    deletearticle () {
      let self = this
      axios({
        method: 'DELETE',
        url: `http://localhost:3009/articles/${self.id}`,
        headers: {
          token: self.token
        }
      })
        .then(article => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('ERROR Delete Article ', error)
        })
    },
    addcomment () {
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3009/comments',
        headers: {
          token: self.token
        },
        data: {
          content: self.newcomment,
          articleid: self.id
        }
      })
        .then(comment => {
          self.newcomment = ''
          self.getdetailarticle()
          this.$router.push({ path: `/article/${self.id}` })
        })
        .catch(error => {
          console.log('ERROR Add Comment ', error)
        })
    },
    deletecomment (input) {
      let self = this
      axios({
        method: 'DELETE',
        url: `http://localhost:3009/comments/${input}`,
        headers: {
          token: self.token
        }
      })
        .then(comment => {
          self.getdetailarticle()
          this.$router.push({ path: `/article/${self.id}` })
        })
        .catch(error => {
          console.log('ERROR Delete Comment ', error)
        })
    }
  },
  created () {
    this.getdetailarticle()
  },
  watch: {
    id (val) {
      this.getdetailarticle()
    },
    islogin (val) {},
    userbasicinfo (val) {}
  }
}
</script>

<style>

</style>
