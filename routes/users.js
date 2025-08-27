const router = require("express").Router();
const {createUser, login, checkToken, } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/users", auth, )

module.exports = router;