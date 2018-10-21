<template>
    <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="input_search" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="runSearch()">Go!</button>
                    </span>
                </div>
            </div>
        </div>

        <!-- Categories Widget -->
        <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#">Web Design</a>
                            </li>
                            <li>
                                <a href="#">HTML</a>
                            </li>
                            <li>
                                <a href="#">Freebies</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#">JavaScript</a>
                            </li>
                            <li>
                                <a href="#">CSS</a>
                            </li>
                            <li>
                                <a href="#">Tutorials</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Side Widget -->
        <div class="card my-4">
            <h5 class="card-header">Side Widget</h5>
            <div class="card-body">
                You can put anything you want inside of these side widgets. They are easy to use, and feature the new
                Bootstrap 4 card containers!
            </div>
        </div>

    </div>
</template>

<script>
import config from '@/config.js'    

export default {
    name: 'Sidebar',
    data () {
        return {
            input_search : ''
        }
    },
    methods : {
        runSearch() {
            let self = this
            axios({
                method : 'GET',
                url : `${config.port}/articles/search?keyword=${self.input_search}`,
            })
            .then((response)=>{
                self.$emit('search-result',response.data.data)
                console.log(response.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
