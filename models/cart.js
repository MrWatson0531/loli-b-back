const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        requireds: true,
    },
    price: {
        type:Boolean,
    required:true,
},
    url: {
        type:String,
        validate: {
            validator(value){
                return validator.isURL(value);
            },
        },
    },
    type:{
        type:String,
        required:true,
        enum: ["cupcake", "cookie"],
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
})