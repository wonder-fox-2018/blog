<template>
<div class="col-sm-4 d-flex flex-column align-items-center profile-grid">
  <div class="card sticky-top" style="width: 18rem;" v-if="isLogin">
    <img class="card-img-top" src="https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person"
      alt="Card image cap">
    <div class="card-body">
      <h2 class="card-title">{{firstName}} {{lastName}}</h2>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Articles: {{userArticles.length}}</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <div class="card-body">
      <a class="card-link" data-toggle="modal" data-target="#modal-create-article"><i class="far fa-plus-square"></i></a>
    </div>
  </div>
  <!-- modal test -->
  <create-article-modal @updateArticle="updateArticle"></create-article-modal>
</div>
</template>

<script>
import CreateArticleModal from '@/components/main-content-components/CreateArticleModal.vue'
export default {
    name: 'Profile',
    components: {
      CreateArticleModal
    },
    props: ['isLogin'],
    data: function() {
      return {
        firstName: '',
        lastName: '',
        id: '',
        userArticles: [],
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
          this.id = result.data._id
          this.$emit('updateUserId', this.id);
          this.$server({
            method: 'GET',
            url: `/article/${this.id}`,
            headers: {
            'access-token': localStorage.getItem('access-token')
            }
          }).then((result) => {
            this.userArticles = result.data;
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      updateArticle(val) {
        this.fetchProfile();
        this.$emit('updateArticle', val);
      }
    },
    mounted() {

      
    },
    created() {
      if (localStorage.getItem('access-token')) {
        
        this.fetchProfile();
      }
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

    a:hover {
      cursor: pointer;
    }
</style>
