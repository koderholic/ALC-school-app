const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const validation = require('../validation/studentValidate');
const validate = require('express-validation');
const path = require('path');

//Multer setup
var storage = multer.diskStorage({
    destination : function (req,file,cb) {
        return cb(null, 'uploads/');
    } ,
    filename : function (req,file,cb) {
        return cb(null, file.fieldname+'-'+Date.now()+file.originalname);
    },
    preservePath  : true
})
const upload = multer({
     storage : storage,

     limits : {
         fileSize : 1000000
     },
     fileFilter : function (req,file,cb) {
         if(['.jpeg','.jpg','.png'].includes(path.extname(file.originalname).toLowerCase() )){
            return cb(null,true)
         }else{
             let error = {
                 status : 422,
                 success : false,
                 errMsg : 'This is not a valid image file, file ext must be either jpeg,jpg or png',
                 errCode : 'fileErr'
             }
             return cb(error);
         }
     },
     onError : function(err, next) {
        console.log('error', err);
        next(err);
      } 
    }); // const upload = multer({ dest: 'uploads/' });//this is the most basic use of multer, it creates the upload folder and generate a random name and autodetermines the file ext and saves it in the upload folder

/* GET all students handler. */
router.get('/', studentController.listStudent);

/* Register student handler. */
router.get('/register', studentController.registerStudent);


/* GET a student details handler. */
router.get('/:id', studentController.getStudent);


/* CREATE student handler. */
router.post('/register',upload.single('photo'), studentController.createStudent);

/* UPDATE student handler. */
router.patch('/:id/update',validate(validation),upload.single('photo'), studentController.updateStudent);

/* DELETE student handler. */
router.delete('/:id', studentController.deleteStudent);


module.exports = router;
