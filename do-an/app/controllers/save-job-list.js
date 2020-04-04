var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    job.find({ _id: { $in: req.session.user.jobsId } }).then(function(data) {
        return res.render('save-job', {data: req.session.user, jobs: data});
    })
})

module.exports = router;