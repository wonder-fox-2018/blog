<template>
    <div class="container">
        <div class="row">
            <div class="alert alert-success" v-if="success === true" role="alert">
                Update Success!
            </div>
            <div class="alert alert-danger" v-if="failed === true" role="alert">
                Update Failed :(
            </div>
            <div class="col-md-6 img">
                <img v-bind:src="profile_avatar"
                    alt="" class="img-rounded">
                <br>
                <br>
                <b>Avatar URL : </b>
                <center><input type="text" class="mt-3" v-model="profile_avatar"></center>
            </div>
            <div class="col-md-6 details">
                <blockquote>
                    <!-- <h5>{{profile_name}}</h5> -->
                    <!-- <small><cite title="Source Title">Chicago, United States of America <i class="icon-map-marker"></i></cite></small> -->
                </blockquote>
                <p>
                    name<br>
                    <input type="text" v-model="profile_name"> <br>
                    email<br>
                    <input type="text" v-model="profile_email"> <br>
                    age<br>
                    <input type="number" v-model="profile_age"> <br>
                    bio<br>
                    <textarea type="text" v-model="profile_bio"></textarea> <br>
                    <button class="btn btn-success mt-3" @click="updateProfile()">Update Profile</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'myprofile',
  props: ['islogin'],
  data () {
    return {
      currentuser: localStorage.getItem('currentuser'),
      profile_name: '',
      profile_email: '',
      profile_age: '',
      profile_bio: '',
      profile_avatar: '',

      success : false,
      failed : false
    }
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      this.token = token

      if (token == null) {
        this.$router.push('/')
      }
    },
    getProfile (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/users/${this.currentuser}`
      })
        .then((response) => {
          self.profile_name = response.data.name
          self.profile_email = response.data.email
          self.profile_age = response.data.age
          self.profile_bio = response.data.bio
          self.profile_avatar = response.data.avatar
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateProfile () {
      let self = this

      let data = {
        name: self.profile_name,
        email: self.profile_email,
        age: self.profile_age,
        bio: self.profile_bio,
        avatar: self.profile_avatar
      }

      axios({
        method: 'PUT',
        url: `${config.port}/users/update`,
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then((response) => {
          self.success = true
          console.log(response)
        })
        .catch((err) => {
          self.failed = true
          console.log(err)
        })
    }
  },
  mounted () {
    this.checkToken()
    this.getProfile()
  },
  watch: {
    islogin: function (val) {
      this.checkToken()
    }
  }
}
</script>

<style scoped>
.container{
    padding:5%;
}
.container .img{
    text-align:center;
}
.container .details{
    border-left:3px solid #ded4da;
}
.container .details p{
    font-size:15px;
    font-weight:bold;
}
</style>
