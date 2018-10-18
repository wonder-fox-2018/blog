<template>
  <div class="col-lg-3">
      <h4>Search</h4>
      <div class="list-group">
        <form>
          <div class="form-group">
            <input type="text" class="form-control" v-model="searchtxt" placeholder="Search Title Article">
          </div>
          <button type="button" class="btn btn-default" @click="clearsearch">Clear Search</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchtxt: ''
    }
  },
  methods:{
    clearsearch(){
      this.searchtxt=''
    }
  },
  watch: {
    searchtxt () {
      console.log('left side', this.searchtxt)
      this.$emit('searchtitle', this.searchtxt)
    }
  }
}
</script>
