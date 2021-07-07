<template>
    <div class="card my-4">
        <h5 class="card-header">Global Chat</h5>
        <div class="card-body">

            <div v-for="(chat,index) in listChat" :key='index'>
                <p><b>{{ chat.name }}:</b> {{ chat.message }}</p>
            </div>
            <input type="text" placeholder="Type your message" @keyup.enter="submitChat" v-model="messageChat">
        </div>
    </div>
</template>

<script>
import database from '@/assets/config.js';

const db = database

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
          name: localStorage.getItem('name'),
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
    const name = localStorage.getItem('name');
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