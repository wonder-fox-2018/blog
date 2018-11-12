<template>
  <!-- Start Modal Update Comment -->
  <div class="ui tiny modal modalUpdateComment">
    <div class="header">
      Update Comment
    </div>

    <div class="content">
      <div class="ui fluid card">
        <div class="content">

          <!-- START ERROR MESSAGE -->
          <div class="ui negative message" v-if="boxError">
            <i class="close icon" @click="closeErrorMsg"></i>
            <div class="header">
              <P style="text-transform: uppercase;">{{ messageError }}</P>
            </div>
          </div>

          <div class="ui form">
            <div class="field">
              <textarea v-model="status"></textarea>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="actions">
      <div class="ui button" onclick="closemodalupdatecomment()">Cancel</div>
      <div class="ui button" @click="btnUpdate">Update</div>
    </div>
  </div>
  <!-- End Modal Update Comment -->
</template>

<script>
import axios from "axios";
import config from "../../../config.js";

export default {
  name: "UpdateComment",
  props: ["commentStatus", "commentId"],
  data: function() {
    return {
      newStatus: "",
      messageError: "",
      boxError: false,
      statusUpdate: 0
    };
  },
  methods: {
    btnUpdate: function() {
      axios({
        method: "PUT",
        url: `${config.port}/comments/update/${this.commentId}`,
        data: {
          status: this.newStatus
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.statusUpdate++;
          this.$emit("status-update-comment", this.statusUpdate);
          $(".tiny.modal.modalUpdateComment")
            .modal({
              transition: "zoom"
            })
            .modal("hide");
        })
        .catch(err => {
          this.messageError = err.response.data.err.errors.status.message;
          this.boxError = true;
        });
    },
    closeErrorMsg: function() {
      this.boxError = false;
    }
  },
  computed: {
    status: {
      get: function() {
        return this.commentStatus;
      },
      set: function(val) {
        return (this.newStatus = val);
      }
    }
  }
};
</script>

<style>
</style>
