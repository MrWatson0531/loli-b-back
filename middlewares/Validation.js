const { Joi, celebrate } = require("celebrate");
const router = require("express").Router();
const validator = require("validator");
const { login, createUser } = require("../controllers/users");
const { addToCart } = require("../controllers/carts");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

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
    params: Joi.object().keys({
      Id: Joi.string().required().hex().length(24),
    }),
  }),
  addToCart
);




module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});



module.exports.validateSignup = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      }),
    });

    module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  }),
});