<template lang="html">
  <section class="creator">
    <h1>Create Article</h1>
    <div class="panel-body">
      <form>
        <formRegister :schema="schema" :model="model"></formRegister>
        <button type="button" v-on:click="create()" class="btn btn-primary">Save</button>
      </form>
    </div>

  </section>
</template>

<script lang="js">
  import VueFormGenerator from "vue-form-generator";
  import axios from 'axios';
  export default  {
    name: 'creator',
    props: ['user','getArticles'],
    components : {
      formRegister : VueFormGenerator.component
    },
    watch: { 
      user: {
        handler (val) {
          this.user = val
          this.model.author = val._id || '' 
        },
        immediate: true, 
        deep: true,
      },
        
    },
    data() {
      return {
        model : {
          authorName : this.user.firstName+' '+this.user.lastName, 
          author : this.user._id,
          title : '',
          content : '',
        },
        schema : {
          fields : [
            {
              type: "input",
              inputType: "text",
              label: "Author",
              model: "authorName",
              readonly: true,
              disabled: true

            },
            {
              type: "input",
              inputType: "text",
              label: "Title",
              model: "title",
              placeholder: "Article Title",
              required: true,
            },
            {
              type: "textArea",
              label: "Article Content",
              model: "content",
              placeholder: "Content",
              rows: 4,
              validator: VueFormGenerator.validators.string
            }
          ]
        }
        
      }
    },
    methods: {
      create(){
        axios.post('http://localhost:3000/articles', {              
              author: this.model.author,
              title: this.model.title,
              content: this.model.content,
            })
            .then(()=> {
              this.getArticles()
              this.$router.push('/')
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      }
    
}
</script>

<style scoped lang="css">
  .creator {

  }
  form {
    margin: 0 auto;
    max-width: 700px;
  }
</style>
