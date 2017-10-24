const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // const upload = multer({ dest: 'uploads/' });//this is the most basic use of multer, it creates the upload folder and generate a random name and autodetermines the file ext and saves it in the upload folder
const validation = require('../validation/studentValidate');
const validate = require('express-validation');

/* GET all students handler. */
router.get('/', studentController.listStudent);

/* GET a student details handler. */
router.get('/:id', studentController.getStudent);

/* CREATE student handler. */
router.post('/register',validate(validation),upload.single('photo'), studentController.createStudent);

/* UPDATE student handler. */
router.patch('/:id/update',validate(validation),upload.single('photo'), studentController.updateStudent);

/* DELETE student handler. */
router.delete('/:id', studentController.deleteStudent);


module.exports = router;
