const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientReportSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    },
    reportText: {
        type: String,
        required: true
    },
    status: {  // Ensure this field exists
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

//create model for patients Reports
const PatientReport = mongoose.model('Reports', patientReportSchema);
module.exports = PatientReport;