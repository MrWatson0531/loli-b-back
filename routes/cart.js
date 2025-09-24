const auth = require("../middlewares/auth");
const router = require("express").Router();
const {
  addToCart,
  removeFromCart,
  getCart,
  createCart,
} = require("../controllers/carts");

router.get("/", auth, getCart);

router.post("/", auth, addToCart);

router.put("/", createCart);

router.delete("/", auth, removeFromCart);

module.exports = router;
