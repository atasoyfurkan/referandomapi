const { MainCard, validate } = require("../models/mainCard");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const mainCards = await MainCard.find().populate({
    path: "comments",
    populate: { path: "owner" }
  });
  res.send(mainCards);
});

router.put("/:id", [auth], async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details);

  const mainCard = await MainCard.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!mainCard)
    return res
      .status(404)
      .send("The mainCard with the given ID was not found.");

  res.send(mainCard);
});

router.post("/", async (req, res) => {
  const mainCard = new MainCard({
    text: `TBMM'nin içinde bulunduğu bölgenin adı "TBMM Külliyesi" olarak adlandırılmalıdır.`,
    agree: 60,
    disagree: 40,
    comments: []
  });
  await mainCard.save();
  res.send(mainCard);
});
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
