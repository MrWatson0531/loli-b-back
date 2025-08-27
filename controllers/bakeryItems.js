const bakeryItem = require("../models/bakeryItem");
const bakeryItem = require("../models/bakeryItem");
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


module.exports = { getItems, dislikeItem, likeItem };
