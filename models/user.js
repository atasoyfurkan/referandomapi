const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  website: {
    type: String,
    default: "No website"
  },
  status: {
    type: String,
    default:
      "Student at University. Loves to build new tools using popular technologies as a creator."
  },
  ppLink: {
    type: String,
    default: "img/img_avatar3.png"
  },
  location: {
    type: String,
    default: "No Location",
    required: true,
    trim: true
  },
  votedCards: [
    {
      mainCard: { type: mongoose.Schema.Types.ObjectId, ref: "MainCard" },
      vote: Boolean
    }
  ],
  numberOfVote: {
    type: Number,
    default: 0,
    required: true
  },
  numberOfComment: {
    type: Number,
    default: 0,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
      ppLink: this.ppLink
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string(),
    surname: Joi.string(),
    website: Joi.string(),
    status: Joi.string(),
    isAdmin: Joi.boolean(),
    ppLink: Joi.string(),
    location: Joi.string(),
    votedCards: Joi.array(),
    numberOfVote: Joi.number(),
    numberOfComment: Joi.number()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
