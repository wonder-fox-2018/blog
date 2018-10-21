<template>
  <!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">All Article
            <small></small>
          </h1>

          <!-- Blog Post -->
          <all-article></all-article>

          <!-- Pagination -->
          <pagination></pagination>

        </div>

        <!-- Sidebar Widgets Column -->
        <sidebar></sidebar>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AllArticle from '@/components/AllArticle.vue'
import Pagination from '@/components/Pagination.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    AllArticle,
    Pagination,
    Sidebar
  }
}
</script>
