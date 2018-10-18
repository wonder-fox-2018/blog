<template>
    <div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Task</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form >
                        <div class="form-group">
                            <label>Title Task </label>
                            <input type="text" v-model="task.title" class="form-control" placeholder="Enter Title">
                            <small style="color: red">{{ MsgTitleEditTask }}</small>
                        </div>
                        <div class="form-group">
                            <label>Description </label>
                            <input type="text" v-model="task.description" class="form-control" placeholder="Enter Description">
                            <small style="color: red">{{ MsgDescEditTask }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doUpdateTask" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'updatetaskmodal',
    props:['idTask','refreshContent'],
    data(){
        return {
            task:'',
            taskInputTitle: '',
            taskInputDescription: '',
            MsgTitleEditTask: '',
            MsgDescEditTask: '',
        }
    },
    methods:{
        doUpdateTask(){
            let apptoken = localStorage.getItem('apptoken')
            this.$server({
                url:  `/articles`,
                method: 'PUT',
                data:{
                    articleid:this.idTask,
                    title: this.task.title,
                    description: this.task.description
                },
                headers: {
                    apptoken: apptoken 
                }
            })
            .then(({data}) => {
                $('#editTaskModal').modal('hide');
                this.refreshContent(); //refresh di parent ke child maincontent tanpa emit
                //this.$emit('to-parent-edit-articles', data.articles )
            })
            .catch((err) => {
                console.log(err)
            });
        }
    },
    watch: {
        idTask(){
            console.log('child',this.idTask)
            let apptoken = localStorage.getItem('apptoken')
            this.$server({
                url:  `/articles/byid`,
                method: 'POST',
                data:{
                    id: this.idTask
                },
                headers: {
                    apptoken: apptoken 
                }
            })
            .then(({data}) => {
                this.task= data.article
            })
            .catch((err) => {
                console.log(err)
            });
        }        
    }
}
</script>
