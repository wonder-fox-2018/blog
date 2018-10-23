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
                        <div class="form-group">
                            <label>Image </label>
                            <input type="file" v-modal="taskInputImage" v-on:change="getImage" class="form-control" id="file" ref="file" placeholder="Enter Image">
                            <small style="color: red">{{ MsgImgTask }}</small>
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
    name:'addtask',
    data(){
        return {
            taskInputTitle: '',
            taskInputDescription: '',
            taskInputImage: '',
            MsgTitleTask: '',
            MsgDescTask: '',
            MsgImgTask: '',
            imageupload: ''
        }
    },
    methods:{
        getImage(){
            this.imageupload = this.$refs.file.files[0] 
        },
        clearTask(){
            this.taskInputTitle= ''
            this.taskInputDescription= ''
            this.taskInputImage= ''
            this.imageupload= ''
            this.MsgTitleTask= ''
            this.MsgDescTask= ''
            $('#file').val(''); 
            //this.$refs.file.files.length=0
        },
        doAddTask(){
            let apptoken = localStorage.getItem('apptoken')
            let uploaddata = new FormData()
            uploaddata.append("imagefile", this.imageupload)
            let data={
                    title: this.taskInputTitle,
                    description: this.taskInputDescription,
                }
            uploaddata.append("data",data)
            this.$server({
                url:  `/articles`,
                method: 'POST',
                data:uploaddata,
                headers: {
                    apptoken: apptoken,
                    title: this.taskInputTitle,
                    description: this.taskInputDescription
                }
            })
            .then(({data}) => {
                console.log(data)
                this.$emit('to-parent-add-articles', data.articles )
                this.clearTask()
                $('#addTaskModal').modal('hide');
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>
