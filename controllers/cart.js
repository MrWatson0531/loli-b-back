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

module.exports= {addToCart, removeFromCart}