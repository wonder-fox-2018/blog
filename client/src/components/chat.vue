<template>
    <div class="ui segment">
          <div>
            <h3>Chat global</h3>
          </div>
          <div class="ui form">
            <div id="chats" style="height: 450px; justify-self:end;">
              <div class="ui floating mini message" v-for="(chat,index) in listChat" :key='index'>
                <p>{{ chat.name }}: {{ chat.message }}</p>
              </div>
            </div>
            <input type="text" placeholder="Type your message" @keyup.enter="submitChat"  v-model="messageChat">
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
      try {
        db.ref('/db/globalChat/').push({
          name: localStorage.getItem('username'),
          message: this.messageChat,
        });
      } catch (error) {
        console.log(error);
      }
      this.messageChat = '';
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
}

</style>