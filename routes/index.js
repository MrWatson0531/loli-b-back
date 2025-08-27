const router = require("express").Router();
const cart = require("./users");
const userRouter = require("./users");
const {login, createUser} = require("../controllers/users");
const { validateSignup, validateSignin, } = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/cart", cart);

router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.use((req, res, next) => {
    next(new NotFoundError("User not found"));
});