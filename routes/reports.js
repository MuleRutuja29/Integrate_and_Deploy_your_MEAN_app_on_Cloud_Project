const express = require('express');
const router = express.Router();

const PatientReport = require('../controllers/reportController')


// reports main page
router.get('/', (req, res) => res.render('reports/reports'));

router.get('/createReport', PatientReport.showReportForm);
router.post('/createReport',PatientReport.createPatientReport);

//view all reports
// router.get('/all', PatientReport.showAllReport);
router.get('/all',PatientReport.viewAllReports);

// router.get('/reports', PatientReport.viewReport);

// Route to show the page with the drop-down menu
router.get('/view-status', PatientReport.renderStatusPage);

// Route to handle the form submission and fetch reports by status
router.get('/status', PatientReport.viewReportByStatus);


router.get('/:id', PatientReport.viewReport);


module.exports = router;