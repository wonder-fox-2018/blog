<template>
    <div class="card my-4">
        <h5 class="card-header">Search</h5>
        <div class="card-body">
        <div class="input-group">
            <input type="text" class="form-control" v-model="search" placeholder="Search for...">
            <span class="input-group-btn">
            <button class="btn btn-secondary" @click="sendSearch" type="button">Go!</button>
            </span>
        </div>  
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            search : ''
        }
    },
    methods: {
        sendSearch() {
            console.log(this.search, 'ini dari comp searchWidget')
            this.$emit('searchArticle', this.search)
        },
    },
}
</script>

<style>

</style>
