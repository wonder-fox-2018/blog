<template>
  <div class="home">

    <div class="container">
      <div class="row">

        <div class="col-lg-3 mt-5">
          <Sidebar :datalocal="datalocal"/>
        </div>

        <router-view/>

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
  }
}
</script>
