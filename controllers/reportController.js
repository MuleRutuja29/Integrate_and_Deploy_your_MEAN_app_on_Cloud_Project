
const patientReport = require('../models/reports');
const Patients = require('../models/patients');
const mongoose = require('mongoose');



// Show createReport form
exports.showReportForm = (req, res) => {
    res.render('reports/createReport');
};
exports.createPatientReport = async (req, res) => {
    try {
        const { patientName, patientEmail, status, reportText } = req.body;
        // Find patient based on provided name and email
        const patient = await Patients.findOne({ name: patientName, email: patientEmail });
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        const newReport = new patientReport({
            patientId: patient._id,
            reportText: reportText,
            status: status
        });

        await newReport.save();
        res.redirect(`/reports/${newReport._id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// View individual patient report
exports.viewReport = async (req, res) => {
    try {
        const report = await patientReport.findById(req.params.id);
        if (report) {
            // Fetch patient details using patientId from the report
            const patient = await Patients.findById(report.patientId);
            if (!patient) {
                return res.status(404).send('Patient not found');
            }

            res.render('reports/viewReports', { report, patient });
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};



// View all patient reports
exports.viewAllReports = async (req, res) => {
    try {
        const reports = await patientReport.find();
        res.render('reports/viewAllReports', { reports });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Render the drop-down page
exports.renderStatusPage = (req, res) => {
    res.render('reports/reportByStatus');  // Renders the page with the drop-down menu
};

// Fetch and display reports by status
exports.viewReportByStatus = async (req, res) => {
    try {
        const status = req.query.status;  // Get the selected status from the query string
        console.log("Received Status:", status);
        if (!status) {
            return res.status(400).send('Status query parameter is missing');
        }
        // Fetch reports from the database based on the selected status
       // Fetch reports from the database based on the selected status
       const reports = await patientReport.find({ status: status });
       console.log("Reports Found:", reports);
         // Set cache-control headers
         res.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
         res.set('Pragma', 'no-cache'); // HTTP 1.0.
         res.set('Expires', '0'); // Proxies.
        // Render the same template with the fetched reports
        res.render('reports/reportByStatus', { reports, status });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Server Error');
    }
};