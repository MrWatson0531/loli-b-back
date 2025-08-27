const router = require("express").Router();
const {addToCart, removeFromCart, getCart, createCart} = require("../controllers/carts");

router.get("/cart", getCart);

router.patch("/cart", addToCart);

router.put("/cart", createCart);

router.delete("/cart", removeFromCart);

module.exports = router;