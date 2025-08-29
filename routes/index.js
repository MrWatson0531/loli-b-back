const router = require("express").Router();
const userRouter = require("./users");
const cartRouter = require("./cart");
const { login, createUser } = require("../controllers/users");
const { validateSignup, validateSignin } = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

// Routes
router.use("/users", userRouter); // all /users routes
router.use("/cart", cartRouter);   // all /cart routes

// Auth routes
router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

// Catch-all for unmatched routes (generic 404)
router.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler middleware (handles thrown errors)
router.use((err, req, res, next) => {
  console.error(err); // log the error for debugging

  const statusCode = err.statusCode || 500; // default to 500 if not specified
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
});

module.exports = router;
