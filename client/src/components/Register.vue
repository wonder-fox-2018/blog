<template>
	<div class="col-12 mb-4">
		<Header></Header>
		<div class="col-lg-4 m-auto">
			<div class="card text-center card-form">
				<div class="card-body">
					<h3>Register</h3>
					<p>Please fill out this form to register</p>
					<form @submit.prevent="register()">
						<div class="form-group">
							<input type="text" v-model="registerUser.name" class="form-control" placeholder="Name" autofocus>
						</div>
						<div class="form-group">
							<input type="email" v-model="registerUser.email" class="form-control" placeholder="Email">
						</div>
						<div class="form-group">
							<input type="password" v-model="registerUser.password" class="form-control" placeholder="Password">
							<small id="passwordHelpBlock" class="form-text text-muted text-left">
								Your password must be 4-10 characters long.
							</small>
						</div>
						<label>Upload Your Avatar</label>
						<div class="custom-file mb-3">
							<input class="custom-file-input" type="file" id="myfile" v-on:change="getImage($event)">
							<label class="custom-file-label text-left" for="myfile">Choose file</label>
						</div>
						<input type="submit" value="Register" class="btn btn-danger btn-block font-weight-bold">
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import axios from 'axios'
import Header from '@/components/Header.vue'
import config from '@/config.js'

export default {
  name: 'Register',
  data () {
	  return {
		registerUser: {
			name: '',
			email: '',
			password: '',
			avatar: ''
		}
	  }
  },
  components: {
	  Header
  },
  methods: {
		register: function() {
			let formdata = new FormData()
			formdata.append('image', this.registerUser.avatar);

			axios.post(`${config.port}/uploadavatar`, formdata, {
					
			})
				.then((response) => {
					axios({
						method: 'POST',
						url: `${config.port}/register`,
						data: {
							name: this.registerUser.name,
							email: this.registerUser.email,
							password: this.registerUser.password,
							avatarURL: response.data.link
						}
					})
						.then((result) => {
							this.registerUser.name = '',
							this.registerUser.email = '',
							this.registerUser.password = '',
							this.registerUser.avatar = ''
							this.$router.push('/');
						})
				})
				.catch((err) => {
					console.log(err);
				})
		},
		getImage(link){
            this.registerUser.avatar = link.target.files[0]
		}
  }
}
</script>

<style>

</style>
