var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    if (req.session.user) {
        var listJobs = [];
        job.find({"cvs.user_id": req.session.user._id})
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                var jobDetail = data[i].toObject();
                for (let j = 0; j < jobDetail.cvs.length; j++) {
                    if (jobDetail.cvs[j].user_id != req.session.user._id) {
                        delete jobDetail.cvs[j];
                    }
                }
                listJobs.push(jobDetail);
            }
            return res.render('jobs-applied', {data: req.session.user, jobs: listJobs});
        })
    } else {
        return res.render('signin');
    }
});

module.exports = router;