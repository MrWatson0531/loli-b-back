const { Joi, celebrate } = require("celebrate");
const router = require("express").Router();
const validator = require("validator");
const { login, createUser } = require("../controllers/users");
const { addToCart } = require("../controllers/cart");

router.patch(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.patch(
  "/cart",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.string().required(),
    }),
  }),
  addToCart
);

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
