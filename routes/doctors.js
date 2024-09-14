const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor main page
router.get('/', (req, res) => res.render('doctors/doctors'));


// Doctor registration and login views
router.get('/register', (req, res) => res.render('doctors/registerDoctors'));
router.get('/login', (req, res) => res.render('doctors/loginDoctors'));


// Doctor registration and login actions
router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);

// View all doctors
router.get('/all', doctorController.getAllDoctors);

// Route to handle search by doctor name
router.get('/search', doctorController.searchDoctorsByName);

// CRUD operations
router.get('/:id', doctorController.getDoctorById);


module.exports = router;