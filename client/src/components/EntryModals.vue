<template>
  <div cless='entry-modals'>
    <div class='item' v-if='isLogin === false'>
      <register-modal :switch2reg='switch2reg' @switch2log='switchLog' @closelog='switch2log === false'></register-modal>
      <login-modal :switch2log='switch2log' @switch2reg='switchReg' @closereg='switch2reg === false'></login-modal>
    </div>
    <div class='item' v-else>
      <div cless='right item'>
        <a class='ui inverted button' @click='logout()'>Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterModal from '@/components/RegisterModal.vue'
import LoginModal from '@/components/LoginModal.vue'

export default {
  name: 'entry-modals',
  props: ['isLogin'],
  components: {
    RegisterModal,
    LoginModal
  },
  data () {
    return {
      switch2reg: false,
      switch2log: false
    }
  },
  methods: {
    switchReg (val) {
      this.switch2reg = val
      this.switch2log = !val
    },
    switchLog (val) {
      this.switch2log = val
      this.switch2reg = !val
    },
    logout () {
      localStorage.clear()
      location.reload()
      this.$emit('isLogin', false)
    }
  },
  created () {
  }
}
</script>

<style>
.modal {
  position: fixed;
  left: 38%;
  top: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 400px;
  background: #03bb91;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 3000px rgba(52, 56, 60, 0.6);
}

.modal .modal-exit {
  position: absolute;
  right: 0;
  font-weight: bold;
  color: black;
}

.modal-message {
  margin: 5% auto 10%;
  width: 60%;
  color: whitesmoke;
}
.modal-message h2 {
  text-align: center;
  line-height: 3;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.field {
  line-height: 2
}

.switch-field {
  line-height: 4
}

.ui.form input[type=text], .ui.form input[type=password] {
  text-align: center;
}

.log2reg {
  color: whitesmoke!important;
  cursor: pointer;
  margin-left: 5px;
}

.log2reg:hover {
  transform: scale(1.2);
  transition: transform .15s ease-in-out;
}

.close {
  color: #fffccc;
  border: none;
  font-weight: bold;
  background: transparent;
  position: absolute;
  right: 0;
  margin-right: 20px;
  font-size: larger;
}

</style>
