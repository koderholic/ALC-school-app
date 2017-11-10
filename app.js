//Module dependencies.
const express = require('express');
const path = require('path');
const webRequestLogger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const validationErr = require('express-validation');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const winston = require('winston'); // logs to a file


//require routes
var students = require('./routes/student');

//logger ssettings
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'logs/alc-info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'logs/alc-error.log',
      level: 'error'
    })
  ]
});
//Mongoose connection settings
const mongoDB =  process.env.MONGOURI || 'mongodb://localhost/alcappDB';
//enable promise for mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB).then(function () {
  logger.info('Mongodb connection successful!');
}).catch(function (err) {
  logger.error('MongoDB Connection Error : ' + err);
});

 
//middleware stack
var app = express();
app.use(webRequestLogger('dev'));
app.use(cookieParser());
app.use(cors());

app.get('/',function (req,res,next) {
    res.status(301).redirect('/students');
});

//serve the profile images
app.use(express.static(path.resolve(__dirname,'uploads')));

//Student route, for all student related request
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
  if (err instanceof validationErr.ValidationError) {

      res.status(err.status).json({
        success : false,
        status : err.status,
        errMsg : errors,
        errCode : errValidateDB
      })
      return;
  }

  //  Remove Error's `stack` property. We don't want users to see this at the production env
  if (req.app.get('env') !== 'development') {
      delete err.stack;
      delete err.devError;
  }
      
  // This responds to the request 
      res.status(err.status || 500).json(err);
});

module.exports = app;
