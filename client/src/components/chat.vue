<template>
  <div class="card my-4">
    <h5 class="card-header"> Chat </h5>
    <div class="ui form">
      <div id="chats" style="height: 450px; justify-self:end;">
        <div class="ui floating mini message" v-for="(chat,index) in listChat" :key='index'>
          <p>{{ chat.name }}: {{ chat.message }}</p>
        </div>
      </div>
      <div class="input-chat">
        <input type="text" placeholder="Type your message" @keyup.enter="submitChat"  v-model="messageChat">
      </div>
    </div>
  </div>
</template>

<script>
import db from '../assets/config.js';

export default {
  data() {
    return {
      listChat: '',
      messageChat: '',
    };
  },
  methods: {
    submitChat() {
      const id = localStorage.getItem('token');
      if(id){
        try {
          db.ref('/db/globalChat/').push({
            name: localStorage.getItem('username'),
            message: this.messageChat,
          });
        } catch (error) {
          console.log(error);
        }
        this.messageChat = '';
      }
      else{

      }
    },
    refreshLobby() {
      db.ref('/db/globalChat').on('value', (snapshot) => {
        if (snapshot.val()) {
          this.listChat = Object.values(snapshot.val())
            .reverse()
            .slice(0, 9)
            .reverse();
          this.removeList = Object.keys(snapshot.val())
            .reverse()
            .slice(9);
        }
      });
    },
  },
  watch: {
    messageChat() {
      this.refreshLobby()
    },
  },
  created() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    if (token && name) {
      this.refreshLobby();
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style>
  #chats {
    overflow: auto;
    margin-bottom: 15px;
    margin-left: 5px
  }
  .input-chat{
    width: 95%;
    margin : auto;
    padding-bottom : 5px;
  }

</style>