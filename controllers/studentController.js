//Requires the student model
const Student = require('../models/student');
const City = require('../models/city');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');
const path = require('path');  

// validate(validation)
//This controller method handles fetching and listing of all students in the database
exports.listStudent = function(req, res, next) {
      Student.find()
      .sort({created_at : 'desc'})
      .exec().then(function (students) {
         
        if (students !== null) {
           students.forEach((student) => console.log(student.fullname+student.gender));
            res.status(200).json({
              success : true,
              successMsg : "Students fetched successfully!",
              responseData : students
            });
        }else{
            res.status(200).json({
              success : true,
              successMsg : "There are currently no students in the database",
              responseData : null
            });
          }    
      }).catch(function (err) {
    
        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Students could not be fetched.",
          errCode : "fetchErrodb",
          devError : err
        };
        next(error);
    
      });
    }




    // /This controller method handles fetching each stdensts details
    exports.getStudent = function(req, res, next) {
      // checks if the id sent is a valid id type;
      if(!ObjectId.isValid(req.params.id)){
        
        let error = {
            status : 400,
            success : false,
            errMsg : 'There is no student with such id',
            errCode : 'errQueryDB'
        }
        next(error);

      }

      Student.findById(req.params.id).populate('city_id').populate('city_id.state_id').exec()
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
            errMsg : "Sorry! There is no student with such id",
            errCode : "fetchErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
    
        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Error occured while fetching all students from the database.Contact your API provider if this persist",
          errCode : "fetchErrodb",
          devError : err
        };
        next(error);
    
      });
    }//end of GET student details 




  //This controller method handles creating the registration form view
  exports.registerStudent = function name(req, res, next) {
    async.parallel({
      
      cities : function (cb) {
        City.find(cb);
      }

    }, (err,result) =>{
      if(err){
        let error = {
          status : 500,
          success : false,
          errMsg : 'Could not fetch entities',
          errCode : 'errDB',
          devError : err
        }
        next(error);
      }
      res.status(200).json({
        success : true,
        successMsg : "Entity fetched successfully",
        responseData : result
      });
    });
  }



  //This controller method handles adding a new student to the database
  exports.createStudent = function(req, res, next) {
    var studentDetails = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        gender : req.body.gender,
        date_of_birth : req.body.dob,
        email : req.body.email,
        mobile : req.body.mobile,
        address : req.body.address,
        city_id : req.body.city,
        current_level : req.body.level,
        current_session : req.body.session,
        course : req.body.course
      };
        console.log(req.body.firstname+req.body.lastname+req.body.course+req.file); 
      if(req.file) studentDetails.photo = req.file;
      // studentDetails.date_of_birth = req.body.dob; 

    
      var  saveStudent = new Student(studentDetails);
      saveStudent.save().then(function (savedStudent) {
        
        console.log('new user');
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
        firstname : req.body.firstname,
        middlename : req.body.middlename,
        lastname : req.body.lastname,
        gender : req.body.gender,
        date_of_birth : req.body.dob,
        email : req.body.email,
        mobile : req.body.mobile,
        address : req.body.address,
        city_id : req.body.city,
        current_class : req.body.class,
        current_session : req.body.session,
        courses : req.body.courses,
      };
      if(req.body.postal) studentUpdates.postal = req.body.postal; 
      studentUpdates.photo =  (req.file)? req.file : {};
      studentUpdates.date_of_birth = moment(req.body.dob); 
    
      Student.findByIdAndUpdate(req.params.id,studentUpdates).then(function (updatedStudent) {
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
            errMsg : "Sorry! There is no student with such id",
            errCode : "updateErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Error occured while creating a new student.Contact your API provider if this persist",
          errCode : "createErrodb",
          devError : err
        };
        next(error);
    
      });
    }    


    // /This controller method handles fetching each stdensts details
    exports.deleteStudent = function(req, res, next) {
      
      // checks if the id sent is a valid id type;
      if(!ObjectId.isValid(req.params.id)){
        
        let error = {
            status : 400,
            error : 'There is no student with such id',
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
            errMsg : "Sorry! There is no student with such id",
            errCode : "fetchErrodb"
          };
          next(error);
        }
      }).catch(function (err) {
          
          let error = {
            status : 500,
            success : false,
            errMsg : "Sorry!An error occured while attepting to delete.Contact your API provider if this persist",
            errCode : "delErrodb",
            devError : err
          };
          next(error);
      
        });
      }//end of DELETE student details 
      