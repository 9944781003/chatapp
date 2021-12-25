var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/User');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});
const UserRouter = require('./routers/userRouter');

mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
  })
  .then(() => {
    app.use(jsonParser);
    app.use('/users', UserRouter);

    app.listen(3000, () => {
      console.log('app is listening on port 3000');
    });
  })
  .catch(err => {
    throw new Error('Failed');
  });
