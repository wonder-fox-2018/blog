<template>
  <div></div>
</template>

<script>
import axios from 'axios'
import config from '@/assets/config'

const { host } = config

export default {
  name: 'verify',
  created() {
    this.isAllowedToVisit()
    this.verifyEmail()
  },
  methods: {
    verifyEmail() {
      let token = this.$router.history.current.params.token
      axios({
        url: host + '/users/verify',
        headers: {
          token: token
        }
      })
        .then(data => {
          this.$router.push({ path: '/login' })
          this.$emit('change-view')
          this.$emit('notif-changer', {
            size: 'six',
            header: 'Verify success',
            message: `${data.data.message}`,
            status: 'positive',
            timeOut: 6000
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    isAllowedToVisit() {
      let token = localStorage.getItem('token')
      if (token) {
        axios({
          url: host + '/users',
          headers: {
            token: token
          }
        })
          .then(data => {
            this.$router.push('/')
            this.$emit('change-view')
          })
          .catch(err => {})
      }
    }
  }
}
</script>

<style>

</style>
