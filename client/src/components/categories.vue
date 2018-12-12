<template>
    <div class="card my-3">
        <h5 class="card-header">Categories</h5>
        <div class="card-body">
        <div class="row">
            <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
                <li>
                    <router-link :to="{name : 'myList', params:{category : 'all'}}" >All</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'myList', params:{category : 'Puisi'}}" >Puisi</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'myList', params:{category : 'Cerita'}}" >Cerita</router-link>
                </li>
            </ul>
            </div>
            <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
                <li>
                    <router-link :to="{name : 'myList', params:{category : 'Lirik'}}" >Lirik</router-link>
                </li>
                <li>
                     <router-link :to="{name : 'myList', params:{category : 'Info'}}" >Info</router-link>
                </li>
                <li>
                    <router-link :to="{name : 'myList', params:{category : ''}}" >Uncategorized</router-link>
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
