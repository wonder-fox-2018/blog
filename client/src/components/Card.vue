<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"></h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props:['changeStatusLogin','isLogin'],
    data() {
        return {
            editAlert: false,
            user: null,
            newpassword:'' ,
            MsgFirstNameReg: '',
            MsgLastNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    methods: {
        doUpdateUser() {
            let apptoken=localStorage.getItem('apptoken')

            this.$server.put(`/users`, {
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                email: this.user.email,
                password: this.newpassword
            },
            {
                headers: { apptoken: apptoken }
            })
            .then(({data}) => {
                console.log(data)
            }).catch((err) => {
                this.editAlert= true;
                console.log(err)
            });
        },
        closeAlert(){
          this.editAlert = false;
        }
    },
    created() {
        let apptoken=localStorage.getItem('apptoken')
        this.$server.get(`/users`, {
            headers: { apptoken: apptoken }
        })
        .then(({data}) => {
            this.user=data.user
            if(this.isLogin==false)
                this.changeStatusLogin()
        }).catch((err) => {
            this.editAlert= true;
            console.log(err)
        });
    }
}
</script>



