<template>
  <div class="home">

    <div class="container">
      <div class="row">

        <div class="col-lg-3 mt-5">
          <Sidebar :datalocal="datalocal" @new-article="setNewArticle"/>
        </div>

        <div class="col-md-8 mt-5">
          <router-view :datalocal="datalocal" :newarticle="newArticle"/>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  props: ['datalocal'],
  components: {
    Sidebar
  },
  data: function () {
    return {
      newArticle: ''
    }
  },
  methods: {
    setNewArticle (article) {
      this.newArticle = article
    }
  }
}
</script>
