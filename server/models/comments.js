const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const commentScheme = new Schema(
  {
    owner: {
      required: [true, "owner is required"],
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comment: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentScheme);
module.exports = Comment;
