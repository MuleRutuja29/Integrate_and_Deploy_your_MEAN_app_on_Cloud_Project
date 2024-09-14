const Doctor = require('../models/doctor');
const mongoose = require('mongoose');

exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialty } = req.body;
        const newDoctor = new Doctor({ name, email, password, specialty });
        console.log("newDoctor",newDoctor);
        await newDoctor.save();
        res.redirect('/doctors');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.loginDoctor = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email, password });
        if (doctor) {
            res.render('doctors/doctorsDetails', { doctor });
        } else {
            res.status(400).send('Doctor not found or incorrect password');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const validateObjectId = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid ObjectId' });
    }
};


// exports.getDoctorById = validateObjectId, async (req, res) => {
//     try {
//         const doctor = await Doctor.findById(req.params.id);
//         console.log("getDoctorById=>",doctor);
//         if (doctor) {
//             res.render('doctors/doctorsDetails', { doctor });
//         } else {
//             res.status(400).send('Doctor not found');
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };


exports.getDoctorById = async (req, res) => {
    const id = req.params.id;
    console.log('Received ID:', id);
    try {
        const doctor = await Doctor.findById(id);
        if (doctor) {
            console.log('Doctor found:', doctor);
            res.render('doctors/doctorById', { doctor });
        } else {
            console.log('Doctor not found for ID:', id);
            res.status(404).send('Doctor not found');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(400).send('Invalid ID format or other error: ' + error.message);
    }
};




exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render('doctors/viewAllDoctors', { doctors });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Search doctors by name
exports.searchDoctorsByName = async (req, res) => {
    try {
        const { search } = req.query;
        console.log("search",search);
        const regex = new RegExp(search, 'i'); // Case-insensitive search regex
        console.log("search regex =>",regex);
        const doctors = await Doctor.find({ name: regex });
        res.render('doctors/viewAllDoctors', { doctors });
    } catch (error) {
        res.status(400).send(error.message);
    }
};