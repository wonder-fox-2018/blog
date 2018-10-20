<template lang="html">
  <section class="login">
    <h1>login</h1>
    <div class="panel-body">
      <form>
        <formLogin :schema="schema" :model="model"></formLogin>
        <button type="button" @click="login()" class="btn btn-primary">Login</button>
      </form>
    </div>
  </section>
</template>

<script lang="js">
  import VueFormGenerator from "vue-form-generator";
  import axios from 'axios';
  
  export default {
    name: 'login',
    components: {
      formLogin: VueFormGenerator.component
    },
    props: ['setUser'],
    data() {
      return {
        model: {
          email: '',
          password: '',
        },
        schema: {
          fields: [{
              type: 'input',
              inputType: 'email',
              label: 'Email',
              model: 'email',
              placeholder: 'Login Email',
              required: true
            },
            {
              type: 'input',
              inputType: 'password',
              label: 'Password',
              model: 'password',
              placeholder: 'Login Password',
              required: true
            }
          ]
        }
      }
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/login', {
            email: this.model.email,
            password: this.model.password
          })
          .then((result) => {
            localStorage.setItem('token', result.data.token)
            this.setUser(result.data.user)
            this.$router.push('/')
          }).catch((err) => {
            console.log(err);
          });
      },
      go: function() {
        this.setUser('kakakakkakakakkak')
        console.log('masuk paekooooooooooooooooo')
      }
    }
  }
</script>

<style scoped lang="css">
  .login * {
    border: none;
  }
  
  .login {
    padding-top: 40px;
  }
  
  form {
    margin: 0 auto;
    max-width: 400px;
  }
</style>
