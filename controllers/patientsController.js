const Patient = require('../models/patients');
const mongoose = require('mongoose');
// const PatientReport = require('../models/patientReport');



// Show registration form
exports.showRegisterForm = (req, res) => {
    res.render('patients/register');
};


// Handle patient registration
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newPatient = new Patient({ name, email, password });
        await newPatient.save();
        res.redirect('/patients');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Show login form
exports.showLoginForm = (req, res) => {
    res.render('patients/loginPatients');
};

// Handle patient login
exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email, password });
        if (patient) {
            res.render('patients/patientsProfile', { patient });
        } else {
            res.status(400).send('Patient not found or incorrect password');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const validateObjectId = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid ObjectId' });
    }
};

// Fetch patient profile and their reports
// exports.getPatientProfile = validateObjectId,async (req, res) => {
//     try {
//         const patient = await Patient.findById(req.params.id);
//         console.log(patient._id);

//         if (patient) {
//             res.render('patients/patientsProfile', { patient});
//         } else {
//             res.status(404).send('Patient not found');
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };


exports.getPatientProfile = async (req, res) => {
    const id = req.params.id;
    console.log('Received ID:', id);
    try {
        const patient = await Patient.findById(id);
        if (patient) {
            console.log('patient found:', patient);
            res.render('patients/patientsProfile', { patient });
        } else {
            console.log('patient not found for ID:', id);
            res.status(404).send('patient not found');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(400).send('Invalid ID format or other error: ' + error.message);
    }
};


exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('patients/viewAllPatients', { patients });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Search doctors by name
exports.searchPatientsByName = async (req, res) => {
    try {
        const { search } = req.query;
        console.log("search",search);
        const regex = new RegExp(search, 'i'); // Case-insensitive search regex
        console.log("search regex =>",regex);
        const patient = await Patient.find({ name: regex });
        console.log("search patient",patient);
        res.render('patients/viewAllPatients', { patient });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getPatientById = validateObjectId, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (patient) {
            res.render('patients/patientsProfile', { patient});
        } else {
            res.status(400).send('Patient not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};