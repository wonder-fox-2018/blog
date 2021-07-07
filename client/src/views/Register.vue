<template lang="html">
  <section class="register">
  
    <h1>Register</h1>
    <div class="panel-body">
      <form>
        <formRegister :schema="schema" :model="model"></formRegister>
        <button type="button" @click="register()" class="btn btn-primary">Register</button>
      </form>
    </div>
  
  </section>
</template>

<script lang="js">
  import VueFormGenerator from "vue-form-generator";
  import axios from 'axios';
  
  export default {
    name: 'register',
    components: {
      formRegister: VueFormGenerator.component
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
  
        schema: {
          fields: [{
              type: "input",
              inputType: 'text',
              label: 'FIRST NAME',
              model: 'firstName',
              placeholder: 'Your First Name',
              required: true,
            },
            {
              type: "input",
              inputType: 'text',
              label: 'LAST NAME',
              model: 'lastName',
              placeholder: 'Your Last Name',
              required: true,
            },
            {
              type: "input",
              inputType: 'email',
              label: 'EMAIL',
              model: 'email',
              placeholder: 'Your Email',
              required: true,
            },
            {
              type: "input",
              inputType: 'password',
              label: 'PASSWORD',
              model: 'password',
              placeholder: 'Your Password',
              required: true,
            }
          ]
        }
      }
    },
    methods: {
      register() {
        axios.post('http://localhost:3000/register', {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            email: this.model.email,
            password: this.model.password,
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(function(error) {
            console.log(error);
          })
      }
    },
  }
</script>

<style scoped>
  .register * {
    border: none;
  }
  
  .register {
    padding-top: 40px;
  }
  
  form {
    margin: 0 auto;
    max-width: 400px;
  }
</style>
