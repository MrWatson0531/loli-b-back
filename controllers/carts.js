const BadReqestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const cart = require("../models/cart");
const user = require("../models/user");

const addToCart = async (req, res) => {
  // req.body should have name, price, url
  try {
    const updatedUser = await user
      .findByIdAndUpdate(
        req.user._id,
        // { $addToSet: { cart: req.body.item._id } },
        {
          $set: {
            [`cart.${req.body.item._id}`]: req.body.quantity,
          },
        },
        { new: true }
      )
      .orFail();

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(404).send({ message: "User not found" });
    }
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid data" });
    }
    res.status(500).send({ message: "Failed to update cart" });
  }
};

const removeFromCart = (req, res) => {
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          [`cart.${req.body.item._id}`]: "",
        },
      },
      { new: true }
    )
    .orFail()
    .then((item) => {
      res.status(200).send({ message: "successfully removed" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Unable to complete request" });
      }
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid data" });
      }
      return res.status(500).send({ message: "Get Items Failed" });
    });
};

const getCart = async (req, res) => {
  try {
    const userDoc = await user
      .findById(req.user._id)
      .populate({ path: "bakeryItem", strictPopulate: false })
      .orFail()
      .then((user) => {
        // if (String(cart.owner) !== req.user._id) {
        //   return res.status(403).send({ message: "User not authorized" });
        // }
        console.log("got cart");
        return res.status(200).send({
          cart: user.cart,
          message: "shopping cart successfully retreived",
        });
      });
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(404).send({ message: "User not found" });
    }
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    res.status(500).send({ message: "Failed to get cart" });
  }
};

const createCart = (req, res, next) => {
  const { name, url, type } = req.body;

  cart
    .create({ namee, url, type, owner: req.user._id })
    .then((cart) => {
      res.send({ data: cart });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Create cart failed"));
      }
      return next(err);
    });
};
module.exports = { addToCart, removeFromCart, getCart, createCart };
