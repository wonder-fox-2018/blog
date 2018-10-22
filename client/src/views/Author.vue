<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 img">
                <img v-bind:src="profile_avatar"
                    alt="" class="img-rounded">
                <br>
                <br>
            </div>
            <div class="col-md-6 details">
                <blockquote>
                    <h5>{{profile_name}}</h5>
                    <small><cite title="Source Title">{{profile_email}} <i class="icon-map-marker"></i></cite></small>
                </blockquote>
                <p>
                    age<br>
                    {{profile.age}} <br>
                    bio<br>
                    {{profile.bio}}<textarea type="text" v-model="profile_bio"></textarea> <br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'authorprofile',
  props: ['islogin'],
  data () {
    return {
      profile_name: '',
      profile_email: '',
      profile_age: '',
      profile_bio: '',
      profile_avatar: ''
    }
  },
  methods: {
    getProfile (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/users/${id}`
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
    }
  },
  mounted () {
    this.getProfile(this.$route.params.authorId)
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
