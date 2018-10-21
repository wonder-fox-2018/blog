<template>
  <section class="chat">
    <div class="chatdisplay" id="chatdisplay">
      <div class="chatitem" v-for="chat in chats" :key="chat.id">
        <div>{{chat.user}}</div>
        <div>: {{chat.content}}</div>
        <div>{{chat.createdAt}}</div>
      </div>
    </div>
    <div class="chatinput">
      <chatform :schema='schema' :model='model'></chatform>
    </div>
  </section>
</template>

<script>
  import VueForm from 'vue-form-generator';
  import moment from 'moment'
  import jQuery from 'jquery'
  
  export default {
    name: 'chat',
    props: ['user'],
    components: {
      "chatform": VueForm.component
    },
    mounted() {
      jQuery(document).ready(function ($) {
        $("#chatdisplay").scrollTop(function() { return this.scrollHeight; });

        setTimeout(() => {
          $("#chatdisplay").fadeOut( "slow" )
        }, 1500);
      });

    },
    data() {
      return {
        chats : [
          {id: 1,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 2,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 3,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 4,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 5,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 6,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 7,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 8,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 9,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 10,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 11,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 12,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 13,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
          {id: 14,user:'adit',content:'kasjdklasdjlalj',createdAt: moment(new Date()).format('hh:mm:ss')},
        ],
        model: {
          id: '',
          chatinput: '',
          createdAt: moment(new Date()).format('hh:mm:ss')
        },
  
        schema: {
          fields : [{
            type : 'input',
            inputType : 'text',
            model : 'chatinput',
            placeholder : 'type chat ...',
            buttons : [{
              classes: 'btn',
              label: 'Send',
              onclick : function(model){
                console.log(model);
              }
            },
            {
              classes: 'btn',
              label: '[ ]',
              onclick : function(){
                jQuery('.chatdisplay').toggle('fast');
              }
            }]
          }]
        }
      }
    },
    methods: {
      
    },
    computed: {
  
    }
  }
  

</script>

<style scoped>
  .chat {
    display: grid;
    position: fixed;
    bottom: 0px;
    right: 10%;
    width: 400px;
    background-color: rgb(255, 255, 255);
    padding: 10px 10px 0 10px;
    max-height: 400px;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 5px 2px rgb(202, 202, 202);
    
  }
  .chatdisplay {
    max-height: 300px;
    overflow: hidden;
    margin-bottom: 15px;
    overflow: auto;
   
  }
  .chatitem {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    text-align: left;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
