const Joi = require("joi");
const mongoose = require("mongoose");
//const {userSchema} = require('./user');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
    //    unique: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  //  votedCards: yapilacak
  numberOfVote: {
    type: Number,
    required: true
  },
  numberOfComment: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    location: Joi.string().required(),
    numberOfVote: Joi.number().required(),
    numberOfComment: Joi.number().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
