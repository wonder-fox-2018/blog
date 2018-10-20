<template>
    <div class="container">
        <div class="row">
            <Article></Article>
            <Sidebar></Sidebar>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Article from '@/components/Article.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Article,
    Sidebar,
  },
};
</script>;
