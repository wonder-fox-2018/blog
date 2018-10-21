<template>
  <div id="app">
    <top-nav-bar :current-view="currentView" @change-view="currentViewChanger" :current-user="currentUser" @get-user="getCurrentUser" :list-categories="listCategories" @query-title="queryTitle" @query-category="queryCategory"/>
    <notif-box v-if="showNotifBox" :payload="notifBoxPayload"/>
    <router-view @notif-changer="notifChanger($event)" @change-view="currentViewChanger" @get-user="getCurrentUser" :current-user="currentUser" :list-articles="listArticles" @x="getCurrentUser" :list-categories="listCategories" @reload-data="reloadData"/>
    <div class="ui grid">
      <div class="ui three wide column" style="position: fixed; bottom: 0; right: 0; z-index: 1;">
        <div class="ui segment mini form">
          <div class="ui dividing header">
            <i class="ui world icon"></i>
            Global Chat Blogtivate</div>
          <chatBody v-for="(chat, index) in listChat" :key="index" :chat-val="chat"/>
          <div class="field">
            <input type="text" placeholder="Chat Global.." v-model="inputChat" @keyup.enter="submitChat" v-bind="{readOnly: !currentUser}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import config from '@/assets/config'
import topNavBar from '@/components/topNavBar'
import notifBox from '@/components/notifBox'
import chatBody from '@/components/chatBody'

const { host, firebaseApp } = config
const db = firebaseApp.database()

export default {
  name: 'app',
  components: {
    topNavBar,
    notifBox,
    chatBody
  },
  data() {
    return {
      currentView: '',
      inputChat: '',
      listChat: '',
      removeList: '',

      listCategories: [],
      listArticles: [],

      showNotifBox: false,
      notifBoxPayload: {
        size: '',
        status: '',
        header: '',
        message: '',
        timeOut: 0
      },

      currentUser: null
    }
  },
  created() {
    this.currentViewChanger()
    this.getCurrentUser()
    this.getCategories()
    this.getAllArticles()
    this.initChat()
  },
  watch: {
    notifBoxPayload: {
      handler(val) {
        this.showNotifBox = !this.showNotifBox

        setTimeout(() => {
          this.showNotifBox = !this.showNotifBox
        }, val.timeOut)
      },
      deep: true
    },
    listChat() {
      let audioChat = new Audio(require('@/assets/wav/Blop-Mark_DiAngelo-79054334.wav'))
      audioChat.play()
    },
    removeList() {
      for (let i = 0; i < this.removeList.length; i++) {
        db.ref(`/globalChat/` + this.removeList[i]).remove()
      }
    }
  },
  methods: {
    initChat() {
      db.ref('/globalChat').on('value', snapshot => {
        if (snapshot.val()) {
          this.listChat = Object.values(snapshot.val())
            .reverse()
            .slice(0, 5)
            .reverse()
          this.removeList = Object.keys(snapshot.val())
            .reverse()
            .slice(5)
        }
      })
    },
    submitChat() {
      db.ref(`/globalChat/`).push({
        name: this.currentUser.fname,
        body: this.inputChat,
        avatar: this.currentUser.avatar,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`
      })
      this.inputChat = ''
    },
    reloadData() {
      this.getCurrentUser()
      this.getAllArticles()
      this.get
    },
    queryCategory(val) {
      if (val !== '') {
        axios({
          url: host + '/article/category/' + val
        })
          .then(data => {
            if (data.data.data.length !== 0) {
              let newData = data.data.data.reverse()
              this.listArticles = newData
            } else {
              this.getAllArticles()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.getAllArticles()
      }
    },
    queryTitle(val) {
      if (val !== '') {
        axios({
          url: host + '/article/search/' + val
        })
          .then(data => {
            if (data.data.data.length !== 0) {
              let newData = data.data.data.reverse()
              this.listArticles = newData
            } else {
              this.getAllArticles()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.getAllArticles()
      }
    },
    getAllArticles() {
      axios({
        url: host + '/article',
        method: 'get'
      })
        .then(data => {
          let newData = data.data.data.reverse()
          this.listArticles = newData
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCategories() {
      axios({
        url: host + '/category',
        method: 'get'
      })
        .then(data => {
          let newData = data.data.data.reverse()
          this.listCategories = newData
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    getCurrentUser() {
      let token = localStorage.getItem('token')
      if (token) {
        axios({
          url: host + `/users`,
          headers: {
            token: token
          }
        })
          .then(data => {
            this.currentUser = data.data.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.currentUser = null
      }
    },
    notifChanger(val) {
      this.notifBoxPayload = val
    },
    currentViewChanger(val) {
      if (val) {
        this.currentView = val
      } else {
        this.currentView = this.$router.history.current.name
      }
    }
  }
}
</script>
<style>

</style>
