<template>
<div class="mini-container">
   <h2 class="ui header">
        <img class="ui image" src="https://mbtskoudsalg.com/images/keyboard-icon-png-4.png">
        <div class="content">
            User Editor
  </div>
    </h2>
    <div class="ui form">
        <div class="ui form">
            <div class="field">
                <label>Username</label>
                <input type="text" v-model="name">
            </div>
        </div>
        <div class='meme' id='capture'>
            <br><br>
            <label><strong>Avatar for user :</strong></label>
            <div class='content'>
            <img v-bind:src='image' v-if='image'>
            <img src="https://storage.googleapis.com/ecommerce.agusrr.xyz/1540203578253download.png" v-else>
        </div>
        </div>
        <div class="image-uploader">
            <br><br>
            <p>From URL</p>
            <input id="imgURL" :disabled="isDisabled" class="block" v-model='image' type="text" placeholder="Link to image"/>
            <p>From Local Disk</p>
            <input type="file" placeholder="image" v-on:change="getImage($event)"><br><br>
            <br>
                 <button type="submit" class="btn btn-warning" @click="editUser">Edit This Instead</button>
            </div>
        <br><br><br>
       </div>
  </div>

</template>

<script>
import axios from 'axios';
var baseurl='https://blog.agusrr.xyz'

export default {
  data() {
    return {
      image: '',
      name: '',
      isDisabled: false,
      result: '',
      file: '',
    };
  },
  methods: {

    editUser() {
      if (typeof this.result === 'object') {
        const formdata = new FormData();
        formdata.append('image', this.result);

        axios.post(`${baseurl}/upload`, formdata)
          .then((image) => {
            const self = this;
            axios.put(`${baseurl}/users`, {
              name: this.name,
              imgUrl: image.data.link,
            }, {
              headers: {
                token: localStorage.getItem('token'),
              },
            })
              .then((data) => {
                this.$emit('updateavatar');
                this.$router.push('/detail/edituser');
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const self = this;
        axios.put(`${baseurl}/users`, {
          name: this.name,
          imgUrl: this.image,
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
          .then((data) => {
            this.$emit('updateavatar');
            this.$router.push('/detail/edituser');
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    getImage(link) {
      this.isDisabled = true;

      this.file = link.target.files[0];
      this.result = link.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.image = reader.result;
      }, false);

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
  },
  watch: {
    $route(val) {
      this.fetchdata(val.params.id);
    },
  },
};
</script>

<style>
#capture {
    max-height: 500px;
}

.mini-container {
    max-width: 807px;
    margin: auto;
}

img {
    border: 0;
    max-width: 500px;
}

#nav {
    margin: 20px;
    padding: 29px;
}

</style>
