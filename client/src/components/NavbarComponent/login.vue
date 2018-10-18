<template>
  <!-- START MODAL LOGIN -->
    <div class="ui tiny modal modalLogin">
      <div class="header">
        LOGIN
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
                <label>Email</label>
                <input placeholder="Enter your email" type="text" v-model="email">
              </div>
              <div class="field">
                <label>Password</label>
                <input placeholder="Enter your password" type="password" v-model="password">
              </div>
              <div class="field">
                <label>Din't have a count? <span style="cursor:pointer" onclick="register()" id="actinExtModal">signup</span></label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="actions">
        <div class="ui deny button">Cancel</div>
        <div class="ui button" @click="btnSignin">Signin</div>
      </div>
    </div>
    <!-- END MODAL LOGIN -->
</template>

<script>
import axios from "axios";
import config from "../../config.js";

export default {
  name: "LoginUser",
  data: function() {
    return {
      email: "",
      password: "",

      messageSuccess: "",
      messageError: "",
      boxSuccess: false,
      boxError: false,
      isLogin: false,
      userEmail: ""
    };
  },
  created() {
    this.statusToken();
    this.statusEmail();
  },
  methods: {
    statusToken: function() {
      let token = localStorage.getItem("token");
      if (token) {
        this.isLogin = true;
        this.$emit("status-login", this.isLogin);
      } else {
        this.isLogin = false;
        this.$emit("status-login", this.isLogin);
      }
    },
    statusEmail: function() {
      let userEmail = localStorage.getItem("email");
      if (userEmail) {
        this.userEmail = userEmail;
        this.$emit("status-email", this.userEmail);
      } else {
        this.userEmail = "";
        this.$emit("status-email", this.userEmail);
      }
    },
    btnSignin: function() {
      let data = {
        email: this.email,
        password: this.password
      };
      axios({
        method: "POST",
        url: `${config.port}/users/login`,
        data
      })
        .then(response => {
          this.email = "";
          this.password = "";
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          this.messageSuccess = `Welcome ${response.data.name}`;
          this.boxSuccess = true;
          this.boxError = false;
          this.$emit("status-login", true);
          this.$emit("status-email", response.data.email);
        })
        .catch(err => {
          let error = err.response.data.message;
          this.messageError = error;
          this.boxError = true;
        });
    },
    closeSuccessMsg: function() {
      this.boxSuccess = false;
      $(".tiny.modal.modalLogin")
        .modal({
          transition: "fade right"
        })
        .modal("hide");
    },
    closeErrorMsg: function() {
      this.boxError = false;
    }
  }
};
</script>

<style>
</style>
