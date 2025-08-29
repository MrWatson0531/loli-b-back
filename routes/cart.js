const router = require("express").Router();
const {addToCart, removeFromCart, getCart, createCart} = require("../controllers/carts");

router.get("/", getCart);

router.patch("/", addToCart);

router.put("/", createCart);

router.delete("/", removeFromCart);

module.exports = router;