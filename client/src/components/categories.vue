<template>
    <div class="card my-3">
        <h5 class="card-header">Categories</h5>
        <div class="card-body">
        <div class="row">
            <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
                <li>
                <!-- <a href="#">Manga</a> -->
                <router-link :to="{name : 'myList', params:{category : 'Manga'}}" >Manga</router-link>
                </li>
                <li>
                <router-link :to="{name : 'myList', params:{category : 'Manwa'}}" >manwa</router-link>
                </li>
                <li>
                <router-link :to="{name : 'myList', params:{category : 'Manhua'}}" >manhua</router-link>
                </li>
            </ul>
            </div>
            <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
                <li>
                 <router-link :to="{name : 'myList', params:{category : 'Anime'}}" >anime</router-link>
                </li>
                <li>
                 <router-link :to="{name : 'myList', params:{category : 'Gunpla'}}" >gunpla</router-link>
                </li>
                <li>
                 <router-link :to="{name : 'myList', params:{category : 'Figure'}}" >figure</router-link>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
