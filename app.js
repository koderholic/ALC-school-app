//Module dependencies.
var express = require('express');
var path = require('path');
var webLogger = require('morgan');
var cookieParser = require('cookie-parser');
var async = require('async');
var cors = require('cors');
var mongoose = require('mongoose');
var logger = require('logger').createLogger('development.log'); // logs to a file


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

app.get('/',function (req,res,next) {

    res.status(301).redirect('/students');
  
});

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
  // if (err instanceof err.ValidationError) return res.status(err.status).json(err)


  //  Remove Error's `stack` property. We don't want users to see this at the production env
  if (req.app.get('env') !== 'development') {
      delete err.stack;
      delete err.devError;
  }
      
  // This responds to the request 
      res.status(err.status || 500).json(err);
});

module.exports = app;
