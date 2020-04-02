var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    var jobAccepted = [];
    var jobProcessing = [];
    job.find({ companyId: req.session.user.companyId }).then(function(jobs) {
        for(var i=0; i<jobs.length; i++) {
            if (jobs[i].status == 1) {
                jobAccepted.push(jobs[i]);
            }
            if (jobs[i].status == 0) {
                jobProcessing.push(jobs[i]);
            }
        }
    }).then(function(data) {
        return res.render('jobs-of-company', { data: req.session.user, jobAccepted: jobAccepted, jobProcessing: jobProcessing });
    })
});

module.exports = router;