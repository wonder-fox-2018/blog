<template>
  <!-- START CATEGORIES -->
  <div class="card" style="width: 100%; margin-top:0px;">
    <div class="content">
      <div class="header">
        Chatting
      </div>
      <div class="fluid ui vertical menu">
        <div class="ui segment" style="height:320px; overflow:scroll;">
          <div class="fluid ui vertical menu" style="margin-bottom:5px;" v-for="(msg, index) in messages" :key="index">
            <a class="item">
              <p style="color:#333333;">{{ msg.email }}</p>
              <span class="ui meta">{{ String(msg.date).slice(0,25) }}</span>
              <div style="margin-top:5px;">
                <span style="font-size:14px; color: #DD5747;">{{ msg.message }}</span>
              </div>
            </a>
          </div>
      
        </div>
      </div>

       <!-- START ERROR MESSAGE -->
        <div class="ui negative message" v-if="boxError">
          <i class="close icon" @click="closeErrorMsg"></i>
          <div class="header">
            <P style="text-transform: uppercase;">{{ messageError }}</P>
          </div>
        </div>

      <div class="ui fluid input" style="margin-bottom: 5px;">
        <input type="text" placeholder="Your message" v-model="message">
      </div>
      <button class="fluid ui secondary button" @click="btnSendMessage">Send Message</button>
    </div>
  </div>
  <!-- END CATEGORIES -->
</template>

<script>
  import database from "../../../firebaseconfig.js"

  export default {
    name: "Chatting",
    props: ["isLogin","userEmail"],
    data: function () {
      return {
        messages: [],
        message: "",
        messageError: "",
        boxError: false,
      }
    },
    created() {
      this.documentReady()
    },
    methods: {
      documentReady: function () {
        let self = this
        var starCountRef = database.ref('globalchat/');
        starCountRef.on('value', function(snapshot) {
          self.messages = []
          let keys = []
          let values = []

          keys = Object.keys(snapshot.val())
          values = Object.values(snapshot.val())

          keys.forEach((key, index) => {
            let data = {
              id : key,
              email: values[index].email,
              message: values[index].message,
              date: values[index].date
            }
            self.messages.push(data)
          })

        });
        
      },
      btnSendMessage: function () {
        if(this.isLogin) {

          if (this.message != "") {
            let self = this
            database.ref('globalchat/').push({
              email: self.userEmail,
              message: self.message,
              date: String(new Date())
            });
            self.message = ""
          } else {
            this.messageError = `MESSAGE IS REQUIRED`
            this.boxError = true
          }
          
        } else {
          this.messageError = `PLEASE LOGIN FIRST`
          this.boxError = true
        }
      },
      closeErrorMsg: function() {
        this.boxError = false;
      }
    }
  }
</script>

<style>

</style>