const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    required: true
  },
  date: {
    type: String
  },
  imgLink: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = {
    content: Joi.string().required(),
    userId: Joi.objectId(),
    upvote: Joi.number(),
    date: Joi.date()
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;
