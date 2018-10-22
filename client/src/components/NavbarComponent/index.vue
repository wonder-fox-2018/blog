<template>
  <!-- START HEADER -->
    <div class="forNavbar">
      <!-- START FIRST NAVABR -->
      <div class="ui pointing menu">
        <a class="item" style="color: grey;">
          About
        </a>
        <a class="item" style="color: grey;">
          Contact
        </a>
        <div class="right menu" style="padding: 4px;">
          <div class="socmed" style="margin-right: 10px;">
            <i class="fa fa-linkedin-square" style="font-size:30px; color: grey;"></i>
            <i class="fa fa-facebook-official" style="font-size:30px; color: grey;"></i>
            <i class="fa fa-twitter-square" style="font-size:30px; color: grey;"></i>
            <i class="fa fa fa-youtube" style="font-size:30px; color: grey;"></i>
          </div>
        </div>
      </div>
      <!-- END FIRST NAVBAR -->

      <!-- START BANNER -->
      <div class="navBanner">
        <img src="https://via.placeholder.com/1100x100" alt="" width="100%;" height="100px;">
      </div>
      <!-- END BANNER -->

      <!-- START SECOND NAVABR -->
      <div class="ui pointing menu" style="background: #333333;">
        <!-- <router-link to="/"><a class="active item" style="color: #FFFFFF;">
          <i class="home icon" ></i> <span style="">Home</span>
        </a></router-link> -->

        <a class="active item" style="color: #FFFFFF;" @click="statushome">
          <i class="home icon" ></i> <span style="">Home</span>
        </a>
        <a class="item" style="color: #FFFFFF;" v-if="isLogin" @click="btnMyArticle">
          <i class="book icon" ></i> <span style="">My Article</span>
        </a>
        <div class="right menu" style="padding: 4px;">
          <div class="item" style="background: #FFFFFF; margin-right: 5px;">
            <div class="ui transparent icon input">
              <input type="text" placeholder="Search..." v-model="searchArticle">
              <i class="search link icon"></i>
            </div>
          </div>
          <div>
            <span class="forRegister" v-if="!isLogin">
              <button class="ui inverted button" onclick="login()">Login</button>
            </span>
            <span class="forLogut" v-else>
              <button class="ui inverted button" @click="btnLogout">Logout</button>
            </span>
          </div>
        </div>
      </div>
      <!-- END SECOND NAVBAR -->

      <LoginUser @status-login="statusLogin" @status-email="statusEmail"/>
      <RegisterUser/>
    </div>
    <!-- END HEADER -->
</template>

<script>
import axios from "axios";
import config from "../../config.js"
import LoginUser from "./login.vue";
import RegisterUser from "./register.vue";

export default {
  name: "NavBar",
  components: {
    LoginUser,
    RegisterUser
  },
  data: function() {
    return {
      isLogin: false,
      userEmail: "",
      searchArticle: "",
      statusHome: 0,
      articles: []
    };
  },
  methods: {
    statusLogin: function(val) {
      this.isLogin = val;
      this.$emit("status-login", this.isLogin);
    },
    statusEmail: function(val) {
      this.userEmail = val;
      this.$emit("status-email", this.userEmail);
    },
    btnLogout: function() {
      this.isLogin = false;
      this.userEmail = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.$emit("status-login", this.isLogin);
      this.$emit("status-email", this.userEmail);
    },
    statushome: function() {
      this.statusHome++;
      this.$emit("status-home", this.statusHome);
      this.$router.push("/");
    },
    btnMyArticle: function() {
      axios({
        method: "GET",
        url: `${config.port}/articles/myarticle`,
        headers : {
          token : localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.articles = response.data.articles
        this.$emit('myarticle', this.articles)
      }).catch((err) => {
        console.log(err.response)
      });
    }
  },
  watch: {
    searchArticle: function(val) {
      this.$emit("status-search-article", val);
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
