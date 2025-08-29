const router = require("express").Router();
const {getCurrentUser, login} = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const validateUser = require("../middlewares/Validation")

router.get("/me", auth, login);
router.get("/me", auth, getCurrentUser )

// router.get("/signup", auth , signup)
module.exports = router;