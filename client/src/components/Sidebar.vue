<template>
    <div>
        <nav id="sidebar">
            <br>
            <div class="sidebar-header"
              v-if= "token !== null & token !== '' ">
              <p>Welcome {{ userbasicinfo.name }}</p>
              <router-link :to="{name: 'addarticle'}">
                <button type="button" class="btn btn-success">
                  Add Article</button>
              </router-link>
             <br>
            <br>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" v-model= "keyword" type="text" placeholder="Search" aria-label="Search">
            </form>
            <br>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click="searcharticles()" >Search</button>
            <br>
            <br>
            <ul class="list-unstyled components">
                <p style="color: red">List of Articles</p>
                <hr>
                <ul class="list-unstyled" id="homeSubmenu">
                    <li v-for="(article, index) in listarticles" :key="index">
                     <router-link :to="{ name: 'id', params: { id: article._id }}">{{ article.title }}</router-link>
                    </li>
                </ul>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['listarticles', 'userbasicinfo', 'islogin', 'getallarticle', 'token'],
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    searcharticles () {
      this.$emit('searcharticles', this.keyword)
    }
  },
  watch: {
    userbasicinfo (val) {},
    listarticles (val) {},
    token (val) {},
    islogin (val) {
      if (!val) {
        this.keyword = ''
      }
    }
  }
}
</script>

<style>

</style>
