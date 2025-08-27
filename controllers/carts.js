const BadReqestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { cart: req.body.itemId } },
      { new: true }
    ).orFail();

    res.status(200).send(updatedUser);
  } catch (err) {
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
    .findByIdAndUpdate(req.user.id, { $pull: { cart: req.params.itemId }})
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res.status(FORBIDDEN).send({ message: "User not authorized" });
      }
      return item
        .then(() => res.status(200).send({ message: "successfully removed" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Unable to complete request" });
      }
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(DEFAULT).send({ message: "Get Items Failed" });
    });
};

const getCart = async(req, res) => {
  try {
    const userDoc = await user.findById(req.user._id)
    .populate("cart")
    .orFail()
    .then((cart) => {
      if (String(cart.owner) !== req.user.id){
        return res.status(FORBIDDEN).send({ message: "User not authorized" }); 
      }
      return cart
      .then(() => res.status(200).send({ message: "shopping cart successfully retreived"}))
    })}
   catch(err) {
    if (err.name === "DocumentNotFoundError") {
      return res.status(404).send({ message: "User not found" });
    }
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    res.status(500).send({ message: "Failed to get cart" });
  };
};

const createCart = (req, res, next) => {
  const {name, url, type} = req.body;

  cart
  .create({namee, url, type, owner: req.user._id})
  .then((cart) => {
    res.send({data: cart});
  })
  .catch((err) => {
    if(err.name === "ValidationError"){
      return next(new BadRequestError("Create cart failed"));
    }
    return next(err);
  })
} 
module.exports= {addToCart, removeFromCart, getCart, createCart}