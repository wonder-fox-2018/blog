<template>
  <!-- START MODAL REGISTER -->
    <div class="ui tiny modal modalRegister">
      <div class="header">
        REGISTER
      </div>

      <div class="content">

        <!-- START SUCCESS MESSAGE -->
        <div class="ui success message" v-if="boxSuccess">
          <i class="close icon" @click="closeSuccessMsg"></i>
          <div class="header">
            <P style="text-transform: uppercase;">{{ messageSuccess }}</P>
          </div>
        </div>

        <!-- START ERROR MESSAGE -->
        <div class="ui negative message" v-if="boxError">
          <i class="close icon" @click="closeErrorMsg"></i>
          <div class="header">
            <P style="text-transform: uppercase;">{{ messageError }}</P>
          </div>
        </div>

        <div class="ui fluid card">
          <div class="content">
            <div class="ui form">
              <div class="field">
                <label>Name</label>
                <input placeholder="Enter your full name" type="text" v-model="name">
              </div>
              <div class="field">
                <label>Picture</label>
                <input type="file" v-on:change="getImage">
              </div>
              <div class="field">
              <div class="field">
                <label>Gender</label>
                <select class="ui search dropdown" v-model="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              </div>
              <div class="field">
                <label>Email</label>
                <input placeholder="Enter your email" type="text" v-model="email">
              </div>
              <div class="field">
                <label>Password</label>
                <input placeholder="Enter your password" type="password" v-model="password">
              </div>
              <div class="field">
                <label>Already have an count? <span style="cursor:pointer" onclick="login()" id="actinExtModal">signin</span></label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="actions">
        <div class="ui deny button">Cancel</div>
        <div class="ui button" @click="btnSignup">Signup</div>
      </div>
    </div>
    <!-- END MODAL REGISTER -->
</template>

<script>
import axios from "axios";
import config from "../../config.js";

export default {
  name: "RegisterUser",
  data: function() {
    return {
      name: "",
      image: "",
      gender: "",
      email: "",
      password: "",

      messageSuccess: "",
      messageError: "",
      boxSuccess: false,
      boxError: false
    };
  },
  methods: {
    btnSignup: function() {
      // let formData = new FormData();
      let data = {
        name: this.name,
        gender: this.gender,
        email: this.email,
        password: this.password
      };

      axios({
        method: "POST",
        url: `${config.port}/users/register`,
        data
      })
        .then(response => {
          this.name = "";
          this.image = "";
          this.gender = "";
          this.email = "";
          this.password = "";

          let success = response.data.message;
          this.messageSuccess = success;
          this.boxSuccess = true;
          this.boxError = false;
        })
        .catch(err => {
          let error = "";
          if (err.response.data.err.code == 11000) {
            error = "email is already";
          } else {
            error = Object.values(err.response.data.err.errors)[0].message;
          }
          this.messageError = error;
          this.boxError = true;
          this.boxSuccess = false;
        });
    },
    getImage: function(image) {
      this.image = image.target.files[0];
    },
    closeSuccessMsg: function() {
      this.boxSuccess = false;
    },
    closeErrorMsg: function() {
      this.boxError = false;
    }
  }
};
</script>

<style>
</style>
