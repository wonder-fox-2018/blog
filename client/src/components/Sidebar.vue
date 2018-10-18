<template>
    <div>
       <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Sidebar</h3>
        </div>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        </form>
        <br>
        <button class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
        <br>
        <br>
        <ul class="list-unstyled components">
            <p style="color: red">List of Articles</p>
            <hr>
            <ul class="list-unstyled" id="homeSubmenu">
                <li v-for="(article, index) in listarticles" :key="index">
                  <button type="button" class="btn btn-light">{{ article.description }}</button>
                </li>
            </ul>
        </ul>
    </nav>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['listarticles']
}
</script>

<style>

</style>
