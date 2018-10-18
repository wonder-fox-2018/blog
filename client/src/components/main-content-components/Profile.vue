<template>
    <div class="col-sm-4 d-flex flex-column align-items-center profile-grid">
      <div class="card" style="width: 18rem;" v-if="isLogin">
        <img class="card-img-top" src="https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person"
          alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{firstName}} {{lastName}}</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    props: ['isLogin'],
    data: function() {
      return {
        firstName: '',
        lastName: '',
    
      };
    },
    methods: {
      fetchProfile() {
        console.log(localStorage.getItem('access-token'));
        this.$server({
          method: 'GET',
          url: '/profile',
          headers: {
            'access-token': localStorage.getItem('access-token')
          }
        }).then((result) => {
          this.firstName = result.data.first_name;
          this.lastName = result.data.last_name;
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    created() {

      if (this.isLogin) {
        console.log('pindah');
        this.fetchProfile();
      }
    },
    updated() {
      
    },
    watch: {
      
    },
    computed: {
      
    }
};
</script>

<style scoped>
    .profile-grid {
        margin-top: 5%;
        margin-bottom: 5%;
    }
</style>
