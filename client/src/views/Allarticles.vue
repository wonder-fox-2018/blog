<template>
    <div>
        <br>
        <br>
        <h1>List Articles</h1>
        <div v-for="(article,index) in listarticles" :key="index">
            <div style="width: 52rem;" class="card">
                <div class="card-body">
                    <label class="badge">{{ article.title }}</label>
                    <br>
                    <p class="card-text">Author: {{ article.author.name}}</p>
                    <hr>
                    <p class="card-text">Comments: {{ article.listcomments.length }}</p>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Allarticle',
  props: ['islogin', 'userbasicinfo', 'listarticles', 'getallarticle'],
  created () {
    this.getallarticle()
  },
  watch: {
    islogin (val) {},
    userbasicinfo (val) {},
    listarticles (val) {}
  }
}
</script>

<style>
</style>
