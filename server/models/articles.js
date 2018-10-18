const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const articleScheme = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"]
    },
    author: {
      required: [true, "author is required"],
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    desc: {
      type: String
    },
    category: {
      type: String
    },
    commentlist: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }]
  },
  {
    timestamps: true
  }
);

const Article = mongoose.model("Article", articleScheme);
module.exports = Article;
