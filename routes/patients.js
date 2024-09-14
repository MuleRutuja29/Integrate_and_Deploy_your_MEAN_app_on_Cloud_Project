const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientsController');


// patients main page
router.get('/', (req, res) => res.render('patients/patients'));

// Register and login routes
router.get('/register', patientController.showRegisterForm);
router.post('/register', patientController.registerPatient);

router.get('/login', patientController.showLoginForm);
router.post('/login', patientController.loginPatient);

// View all patients
router.get('/all', patientController.getAllPatients);


// Route to handle search by doctor name
router.get('/search', patientController.searchPatientsByName);

// CRUD operations
router.get('/:id', patientController.getPatientProfile);

module.exports = router;