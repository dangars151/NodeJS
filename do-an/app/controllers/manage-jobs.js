var express = require("express");

var router = express.Router();
var job = require('../models/Job');

router.get('/', function(req, res) {
    job.find({ status: 0 }).then(function(data) {
        res.render('manage-jobs', { jobs: data });
    })
});

router.post('/', function(req, res) {
    job.updateMany(
        { _id: { $in: req.body.jobsAccepted } },
        { $set: { status:1 } }
    ).then(function(data) {
        job.find({ status: 0 }).then(function(data) {
            res.render('manage-jobs', { jobs: data });
        })
    })
});

module.exports = router;