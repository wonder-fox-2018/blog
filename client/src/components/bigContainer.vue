<template>
    <div>
        <router-view @searchArticle="searchArticle" :updatecomponent="updatecomponent" :article="article" :isLogin="isLogin"></router-view>
    </div>
</template>

<script>
export default {
    props : ['article', 'isLogin', 'updatecomponent'],
    methods: {
        searchArticle(value) {
            this.$emit('searchArticle', value)
        },
    },
}
</script>

<style>

</style>
