var express = require('express');
const User = require('../models/User');

var UserRouter = express.Router();

UserRouter.get('/', async (req, response, next) => {
  try {
    let users = await User.find(req.query);
    console.log(users);
    response.send(users);
  } catch (error) {
    console.log(error);
  }
});
UserRouter.post('/', async (req, response, next) => {
  console.log(req.body);
  try {
    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    response.status(200).end();
  } catch (error) {
    response.send(error);
  }
});
UserRouter.put('/:_id', async (req, res) => {
  try {
    let user = await User.findById(req.params._id);
    (user.firstname = req.body.firstname),
      (user.lastname = req.body.lastname),
      (user.email = req.body.email);

    await user.save();
    res.status(200).end();
  } catch (error) {
    res.send(error);
  }
});
UserRouter.patch('/:_id', async (req, res) => {
  try {
    await User.findByIdAndUpdate({_id: req.params._id}, req.body);
    res.status(200).end();
  } catch (error) {
    res.send(error);
  }
});
UserRouter.delete('/:_id', async (req, res) => {
  try {
    await User.deleteOne({_id: req.params._id});
    res.status(200).end();
  } catch (error) {
    res.send(error);
  }
});

module.exports = UserRouter;
