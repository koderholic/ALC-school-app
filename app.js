//Module dependencies.
const express = require('express');
const path = require('path');
const webLogger = require('morgan');
const cookieParser = require('cookie-parser');
const async = require('async');
const cors = require('cors');
const mongoose = require('mongoose');
const EVerr = require('express-validation');
const logger = require('logger').createLogger('development.log'); // logs to a file



//models
var students = require('./routes/student');
var app = express();


//midlleware settings

const mongoDB =  process.env.MONGOURI || 'mongodb://localhost/alcappDB';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB).then(function () {
  logger.info('Mongodb connection successful!');
}).catch(function (err) {
  logger.error('MongoDB Connection Error : ' + err);
});
 
//middleware stack
app.use(webLogger('dev'));
app.use(cookieParser());
app.use(cors());


app.get('/',function (req,res,next) {

    res.status(301).redirect('/students');
  
});

//serve the profile image
app.use(express.static(path.resolve(__dirname,'uploads')));
//student routes, gets access to this route only if mongoose connection has been made
  app.use('/students', students);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = {
    status : 404,
    success : false,
    errMsg : "Page Not Found",
    errCode : "notFoundErro"
  };
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  
  //  We log the error internaly 
  logger.error(err);

  //validator errors
  // if (err instanceof EVerr.ValidationError && err.statusText === 'Bad Request') {

  //     res.status(err.status).json({
  //       success : false,
  //       status : err.status,
  //       errMsg : errors,
  //       errCode : errValidateDB
  //     })
  //     return;
  // }

  //  Remove Error's `stack` property. We don't want users to see this at the production env
  if (req.app.get('env') !== 'development') {
      delete err.stack;
      delete err.devError;
  }
      
  // This responds to the request 
      res.status(err.status || 500).json(err);
});

module.exports = app;
