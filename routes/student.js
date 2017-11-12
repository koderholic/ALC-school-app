//Modules Dependencies
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const multer = require('multer');
const studentInput = require('../validation/studentValidate');
const validate = require('express-validation');
const path = require('path');
const sanitizer = require('express-sanitizer');
const paramSanitizer = require('express-sanitize-escape');
const paginate = require('express-paginate');

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
        logger.error('error', err);
        let error = {
            status : 500,
            success : false,
            errMsg : 'Failed to upload file to the server, please try again!',
            errCode : 'fileErr',
            devErr : err
        }
        next(error);
    } 
}); 
// router.use(sanitizer());

paramSanitizer.sanitizeParams(router, ['id']);
/* GET all students request handler. */

router.get('/', StudentController.listStudent);

/* Register student request handler. */
router.get('/register', StudentController.registerStudent);


/* GET a student details request handler. */
router.get('/:id', StudentController.getStudent);


/* CREATE student request handler. */
router.post('/register',validate(studentInput),upload.single('photo'), StudentController.createStudent);

/* UPDATE student request handler. */
router.patch('/:id/update',validate(studentInput),upload.single('photo'), StudentController.updateStudent);

/* DELETE student request handler. */
router.delete('/:id', StudentController.deleteStudent);


module.exports = router;
