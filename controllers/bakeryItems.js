const bakeryItem = require("../models/bakeryItem");
const clothingItem = require("../models/bakeryItem");
const {
  DEFAULT,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
} = require("../utils/errors");

const getItems = (req, res) => {
  bakeryItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      console.error(error);
      return res.status(DEFAULT).send({ message: "Get Items Failed" });
    });
};

const dislikeItem = (req, res) =>
  bakeryItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "dislike Items Failed" });
      } else if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data", error });
      }
      return res.status(DEFAULT).send({ message: "Dislike Items Failed" });
    });

const likeItem = (req, res) =>
  bakeryItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "dislike Items Failed" });
      } else if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data", error });
      }
      return res.status(DEFAULT).send({ message: "Like Items Failed" });
    });

module.exports = { getItems, dislikeItem, likeItem };
