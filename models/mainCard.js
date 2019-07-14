const Joi = require("joi");
const mongoose = require("mongoose");

const MainCard = mongoose.model(
  "MainCard",
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
      trim: true
    },
    agree: Number,
    disagree: Number,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  })
);

function validateMainCard(mainCard) {
  const schema = {
    text: Joi.string().required(),
    agree: Joi.number().required(),
    disagree: Joi.number().required(),
    comments: Joi.array().items(Joi.ObjectId())
  };

  return Joi.validate(mainCard, schema);
}

exports.MainCard = MainCard;
exports.validate = validateMainCard;