//module dependencies
const Student = require('../models/student');
const City = require('../models/city');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;
const async = require('async');
const path = require('path');  
const paginate = require('express-paginate');



//This controller method handles fetching and listing of all students in the database
exports.listStudent = function(req, res, next) {
  async.parallel({
    paginated : function (cb) {
      Student.paginate({}, { page: req.query.page, limit: req.query.limit,sort : {created_at : 'desc'} },cb);
    },
    allStudents : function (cb) {
      Student.find(cb);
    }  
  },  (err, result) => {
        if (err) {
          let error = {
            status : 500,
            success : false,
            errMsg : "Sorry! could not fetch all students fro the datavase.",
            errCode : "fetchErrdb",
            devError : err
          };
          next(error);
        }
        res.status(200).json({
          success : true,
          object: 'list',
          successMsg : "Students fetched successfully!",
          has_more: paginate.hasNextPages(req)(result.paginated.pages),
          prevUrl : paginate.href(req)(true),
          nextUrl : paginate.href(req)(), 
          paginatedData : result.paginated.docs,
          responseData : result.allStudents,
          pageCount: result.paginated.pages,
          pages: paginate.getArrayPages(req)(3, result.paginated.pages, req.query.page)
        });
  });
}



    // This controller method handles fetching each stdensts details
    exports.getStudent = function(req, res, next) {

      // checks if the id sent is a valid id type;
      if(!ObjectId.isValid(req.params.id)){
        let error = {
            status : 400,
            success : false,
            errMsg : 'Sorry! Could not find student details.',
            errCode : 'errQueryDB'
        }
        next(error);

      }
      //fetch student details
      Student.findById(req.params.id).populate('city_id').exec()
      .then(function (student) {
        if (student !== null) {
          res.status(200).json({
            success : true,
            responseData : student,
            successMsg : "Student details fetched successfully"
          });

        }else{
          let error = {
            status : 400,
            success : false,
            errMsg : "Sorry! Could not find student details.",
            errCode : "fetchErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
    
        let error = {
          status : 500,
          success : false,
          errMsg : "Error! Could not fetch student details.",
          errCode : "fetchErrodb",
          devError : err
        };
        next(error);
    
      });
    }//end of GET student details 


  //This controller method handles creating the registration form view
  exports.registerStudent = function name(req, res, next) {
    City.find().then((cities) => {
      res.status(200).json({
        success : true,
        successMsg : "Cities fetched successfully",
        responseData : cities
      });
    }).catch((err) =>{
        let error = {
          status : 500,
          success : false,
          errMsg : 'Could not fetch cities',
          errCode : 'errDB',
          devError : err
        }
        next(error);
    });
  }


  //This controller method handles adding a new student to the database
  exports.createStudent = function(req, res, next) {
    var studentDetails = {
        firstname : req.sanitize(req.body.firstname),
        lastname : req.sanitize(req.body.lastname),
        gender : req.sanitize(req.body.gender),
        date_of_birth : req.sanitize(req.body.dob),
        email : req.sanitize(req.body.email),
        mobile : req.sanitize(req.body.mobile),
        address : req.sanitize(req.body.address),
        city_id : req.sanitize(req.body.city),
        current_level : req.sanitize(req.body.level),
        current_session : req.sanitize(req.body.session),
        course : req.sanitize(req.body.course)
      };
      if(req.file) studentDetails.photo = req.file;
      var  saveStudent = new Student(studentDetails);
      saveStudent.save().then(function (savedStudent) {
        res.status(201).json({
          success : true,
          responseData : savedStudent,
          successMsg : "You have successfully been registered!"
        });
      }).catch(function (err) {
        if (err.name === 'MongoError' & err.code === 11000) {
          console.log('yes')
          let error = {
            status : 400,
            success : false,
            errMsg : "Sorry! A student with the email address you entered already exist.",
            errCode : "createErrodb",
            devError : err
          };
          next(error);
        }else{
          let error = {
            status : 500,
            success : false,
            errMsg : "Sorry! Registration was not successful, please try again!",
            errCode : "createErrodb",
            devError : err
          };
          next(error);
        }
        
    
      });
    }   
    
    
  //This controller method handles adding a new student to the database
  exports.updateStudent = function(req, res, next) {
    var studentUpdates = {
        firstname : req.sanitize(req.body.firstname),
        lastname : req.sanitize(req.body.lastname),
        gender : req.sanitize(req.body.gender),
        date_of_birth : req.sanitize(req.body.dob),
        email : req.sanitize(req.body.email),
        mobile : req.sanitize(req.body.mobile),
        address : req.sanitize(req.body.address),
        city_id : req.sanitize(req.body.city),
        current_level : req.sanitize(req.body.level),
        current_session : req.sanitize(req.body.session),
        course : req.sanitize(req.body.course)
      };
      console.log(req.body.firstname+req.body.lastname+req.body.course+req.file); 
      if(req.file) studentUpdates.photo = req.file; 
    
      Student.findByIdAndUpdate(req.params.id,studentUpdates).then( (updatedStudent) => {
        if (updatedStudent) {
          res.status(203).json({
            success : true,
            responseData : updatedStudent,
            successMsg : "Details has been Updated successfully"
          });
        }else{
          let error = {
            status : 400,
            success : false,
            errMsg : "Update failed! Your details could not be found",
            errCode : "updateErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Your details could not be updated,please try again later.",
          errCode : "createErrodb",
          devError : err
        };
        next(error);
    
      });
    }    


    // /This controller method handles fetching each students details
    exports.deleteStudent = function(req, res, next) {
      
      // checks if the id sent is a valid id type;
      if(!ObjectId.isValid(req.params.id)){
        
        let error = {
            status : 400,
            error : 'Sorry! Could not find student',
            errCode : 'errQueryDB'
        }
        next(error);
      }
      
      Student.findByIdAndRemove(req.params.id).then(function (removedstudent) {
          
        if (removedstudent !== null) {
          res.status(204).json({ success : true});
        }else{
          let error = {
            status : 400,
            success : true,
            errMsg : "Sorry! Could not find student",
            errCode : "fetchErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
          
          let error = {
            status : 500,
            success : false,
            errMsg : "Sorry! Could not delete student, please try again later.",
            errCode : "delErrodb",
            devError : err
          };
          next(error);
      
        });
      }//end of DELETE student details 
      