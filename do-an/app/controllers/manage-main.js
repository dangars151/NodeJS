var express = require("express");

var router = express.Router();
var job = require('../models/Job');
var company = require('../models/Company');

router.get('/', function(req, res) {
    job.find().then(function(jobs) {
        res.render('manage-main', { jobs: jobs });
    })
});

router.post('/', function(req, res) {
    if (req.body.status == '') {
        status = [0, 1];
    } else if(req.body.status == 1) {
        status = [1];
    } else {
        status = [0];
    }

    job.find({
        title: new RegExp(req.body.title),
        companyName: new RegExp(req.body.company),
        companyLocation: new RegExp(req.body.location),
        status: { $in: status }
    }).then(function(jobs) {
        return res.render('manage-main', { jobs: jobs });
    })
})


module.exports = router;