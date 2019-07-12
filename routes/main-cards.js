const { MainCard, validate } = require("../models/main-card");
const { Comment } = require("../models/comment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const mainCards = await MainCard.find().populate("comments");
  console.log(mainCards);
  res.send(mainCards);
});

// router.post("/", async (req, res) => {
//   const mainCard = new MainCard({
//     text: `TBMM'nin içinde bulunduğu bölgenin adı "TBMM Külliyesi" olarak adlandırılmalıdır.`,
//     agree: 60,
//     disagree: 40,
//     comments: ["5d27d8fe13cf555438148af8", "5d27d8fe13cf555438148af9"]
//   });
//   await mainCard.save();
//   console.log(mainCard);
//   res.send(mainCard);
// });
// router.post("/", async (req, res) => {
//   const comment = new Comment({
//     imgLink: "img/img_avatar3.png",
//     name: "Dogukan Akar",
//     date: "35 minutes ago",
//     text: "electronic typesetting, remaining essentially unchanged.",
//     upvote: 8
//   });
//   await comment.save();
//   console.log(comment);
//   res.send(comment);
// });

module.exports = router;
