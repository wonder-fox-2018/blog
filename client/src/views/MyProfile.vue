<template>
    <h3> My Profile</h3>
</template>

<script>
export default {
    name : 'myprofile',
    data() {
        return {

        }
    },
    methods : {
        checkToken() {
            let token = localStorage.getItem('token')
            this.token = token
            
            if(token == null){
                this.$router.push('/')
            } 
        }
    },
    mounted() {
        this.checkToken()
    }
}
</script>

<style>

</style>
