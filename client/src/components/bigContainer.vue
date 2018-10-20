<template>
    <div>
        <router-view @searchArticle="searchArticle" :article="article" :isLogin="isLogin"></router-view>
    </div>
</template>

<script>
export default {
    props : ['article', 'isLogin'],
    methods: {
        searchArticle(value) {
            this.$emit('searchArticle', value)
        },
    },
}
</script>

<style>

</style>
