const express = require("express");
const helmet = require("helmet");
const mainCards = require("../routes/main-cards");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(helmet());
  app.use(express.json());
  app.use("/api/main-cards", mainCards);
  app.use(error);
};
