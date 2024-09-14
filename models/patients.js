const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define Patient Schema
const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Patient model
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;