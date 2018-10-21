<template>
  <div>
    <div id='chatbox'>
      <div class="row m-0 p-3 border-bottom" v-for='(chat, index) in chats' :key='index'>
        <div class="col-12 text-left" style="width: 100%">
          <h6><b><span class="pr-2">{{ chat.name }}</span></b> <i><span style="opacity: 0.5">{{ chat.email }}</span></i></h6>
          <h6>{{ chat.message }}</h6>
        </div>
      </div>
    </div>
    <div class="row mt-4" id='addchat'>
      <div class="col-10 pr-0">
        <input type="text" v-model='message' @keyup.enter="sendChat">
      </div>
      <div class="col-2 pl-0">
        <button @click='sendChat'><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../firebase-config.js'
import axios from 'axios'

export default {
  name: 'livechat',
  data () {
    return {
      chats: [],
      message: ''
    }
  },
  methods: {
    initiateLC () {
      db.ref('/').on('value', snapshot => {
        if (snapshot.val()) {
          this.chats = snapshot.val()
        }
      })
    },
    sendChat () {
      axios({
        url: 'http://localhost:3000/users/checklogin',
        method: 'post',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          db.ref(`/${this.chats.length}`).set({
            message: this.message,
            name: data.data.userName,
            email: data.data.userEmail
          })
          this.message = ''
          setTimeout(() => {
            this.scrollToEnd()
          }, 500)
        })
        .catch(err => {
          console.log(err)
        })
    },
    scrollToEnd () {
      let chatbox = this.$el.querySelector('#chatbox')
      chatbox.scrollTop = chatbox.scrollHeight + 100
    }
  },
  created () {
    this.initiateLC()
    setTimeout(() => {
      this.scrollToEnd()
    }, 2000)
  }
}
</script>

<style>

</style>
