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
                         <div class="form-group">
                             <img class="m-1" v-bind:src="task.imageurl" style="width: 200px; height:200px">
                            <input type="file" v-on:change="getImage" class="form-control" id="file2" ref="file2" placeholder="Enter Image">
                            <small style="color: red">{{ MsgImgTask }}</small>
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
            MsgImgTask: '',
            imageupload: ''
        }
    },
    methods:{
        getImage(){
            this.imageupload = this.$refs.file2.files[0] 
        },
        doUpdateTask(){
            let apptoken = localStorage.getItem('apptoken')
            let uploaddata = new FormData()
            uploaddata.append("imagefile", this.imageupload)
            let data={
                    articleid:this.idTask,
                    title: this.task.title,
                    description: this.task.description
                }
            uploaddata.append("data",data)

            this.$server({
                url:  `/articles`,
                method: 'PUT',
                data:uploaddata,
                headers: {
                    apptoken: apptoken,
                    articleid:this.idTask,
                    title: this.task.title,
                    description: this.task.description
                }
            })
            .then(({data}) => {
                $('#editTaskModal').modal('hide');
                this.refreshContent(); //refresh di parent ke child maincontent tanpa emit
                $('#file2').val(''); 
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
