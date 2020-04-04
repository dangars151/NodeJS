var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var user = require('../models/User');

router.post('/', function(req, res) {
    var jobsId = req.session.user.jobsId;
    for( var i = 0; i < jobsId.length; i++){ 
        if ( jobsId[i] == req.body.jobId) {
            jobsId.splice(i, 1); 
        }
    }
    req.session.user.jobsId = jobsId;
    user.updateOne({_id: req.session.user._id}, {
        jobsId: jobsId
    }).then(data => {
        return job.find({_id: {$in: jobsId}})
    }).then(data => {
        return res.render('save-job', {jobs: data, data: req.session.user});
    })
});

module.exports = router;