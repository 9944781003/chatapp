const mongoose = require('mongoose');
const {Schema} = mongoose;
// var validator = require('validator');

const User = mongoose.model(
  'User',
  new Schema({
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 50,
      validate: () => {
        return true;
      },
    },
    phone: {
      type: String,
      unique: true,
      validate: () => {
        return true;
      },
    },

    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
  }),
);
module.exports = User;
