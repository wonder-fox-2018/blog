<template>
    <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Task</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Title Task </label>
                            <input v-model="taskInputTitle" type="text" class="form-control" placeholder="Enter Title">
                            <small style="color: red">{{ MsgTitleTask }}</small>
                        </div>
                        <div class="form-group">
                            <label>Description </label>
                            <input v-model="taskInputDescription" type="text" class="form-control" placeholder="Enter Description">
                            <small style="color: red">{{ MsgDescTask }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doAddTask" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data(){
        return {
            taskInputTitle: '',
            taskInputDescription: '',
            MsgTitleTask: '',
            MsgDescTask: '',
        }
    },
    methods:{
        doAddTask(){
            let apptoken = localStorage.getItem('apptoken')
            this.$server({
                url:  `/articles`,
                method: 'POST',
                data:{
                    title: this.taskInputTitle,
                    description: this.taskInputDescription
                },
                headers: {
                    apptoken: apptoken 
                }
            })
            .then(({data}) => {
                this.$emit('to-parent-add-articles', data.articles )
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>
