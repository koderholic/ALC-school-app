//Requires the student model
const Student = require('../models/student');
const Class = require('../models/class');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;
  


//This controller method handles fetching and listing of all students in the database
exports.listStudent = function(req, res, next) {
    console.log('i am here');
      
      Student.find()
      .populate('city_id')
      .populate('state_id')
      .sort({created_at : 'desc'})
      .exec().then(function (students) {
         
        if (students.length > 0) {

            console.log('student');
            res.status(200);
            res.json(students);

        }else{
            
            console.log('no student');
            res.status(200).json({message : "There are currently no students in the database"});//no content found
        }
      }).catch(function (err) {
    
        let error = {
          status : 500,
          errMsg : "Sorry! Error occured while fetching all students from the database.Contact your API provider if this persist",
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
            error : 'There is no building with such id',
            errCode : 'errQueryDB'
        }
        next(error);

      }

      Student.findById(req.params.id).populate('city_id').populate('city_id.state_id').exec()
      .then(function (student) {
          
        if (student !== null) {
          res.status(200).json({
            success : true,
            data : student,
            successMsg : "Student details fetched successfully"
          });

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
          errMsg : "Sorry! Error occured while fetching all students from the database.Contact your API provider if this persist",
          errCode : "fetchErrodb",
          devError : err
        };
        next(error);
    
      });
    }//end of GET student details 



  //This controller method handles adding a new student to the database
  exports.createStudent = function(req, res, next) {
    console.log(req.body);
    console.log('i am'+ req.body.firstname+ req.body.mobile + req.body.address + req.body.current_session);
      
    var studentDetails = {
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
        console.log('i am  here enter details'); 
      if(req.body.postal) studentDetails.postal = req.body.postal; 
      if(req.file) studentDetails.photo = req.file;
      studentDetails.date_of_birth = moment(req.body.dob); 

    
      var  saveStudent = new Student(studentDetails);
      saveStudent.save().then(function (savedStudent) {
        
        console.log('new user');
        res.status(201).json({
          success : true,
          data : savedStudent,
          successMsg : "Studen created successfully"
        });

      }).catch(function (err) {
        
        console.log('no mongoose connect');

        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Error occured while creating a new student.Contact your API provider if this persist",
          errCode : "createErrodb",
          devError : err
        };
        console.log(error);
        next(error);
    
      });
      
      console.log('i am here,register end');
    }   
    
    
    //This controller method handles adding a new student to the database
  exports.updateStudent = function(req, res, next) {
    console.log(req.body);
    console.log('i am'+ req.body.firstname+ req.body.mobile + req.body.address + req.body.session);
      
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
        console.log('i am  here enter details'); 
      if(req.body.postal) studentUpdates.postal = req.body.postal; 
      studentUpdates.photo =  (req.file)? req.file : {};
      studentUpdates.date_of_birth = moment(req.body.dob); 
    
      Student.findByIdAndUpdate(req.params.id,studentUpdates).then(function (updatedStudent) {
        
        console.log('Updated user');
        if (updatedStudent) {
          res.status(203).json({
            success : true,
            data : updatedStudent,
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
        
        console.log('no mongoose connect');

        let error = {
          status : 500,
          success : false,
          errMsg : "Sorry! Error occured while creating a new student.Contact your API provider if this persist",
          errCode : "createErrodb",
          devError : err
        };
        console.log(error);
        next(error);
    
      });
      
      console.log('i am here,register end');
    }    


    // /This controller method handles fetching each stdensts details
    exports.deleteStudent = function(req, res, next) {
      
      // checks if the id sent is a valid id type;
      if(!ObjectId.isValid(req.params.id)){
        
        let error = {
            status : 400,
            error : 'There is no building with such id',
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
            errMsg : "Sorry!An error occured while attepting to delete.Contact your API provider if this persist",
            errCode : "delErrodb",
            devError : err
          };
          next(error);
      
        });
      }//end of DELETE student details 
      