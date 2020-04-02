var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var work = require('../models/Work');

router.post('/', function(req, res) {
    var titles = [];
    work.find().then(function(data) {
        data.forEach(function(item) {
            titles.push(item);
        })
    })

    if(req.body.salaryFrom == '') req.body.salaryFrom = 1;
    if(req.body.outDate == '') req.body.outDate = Date.now();

    job.find({
        name: new RegExp(req.body.title),
        companyLocation: new RegExp(req.body.location),
        salary_from: { $gte: req.body.salaryFrom },
        salary_to: { $lte: req.body.salaryTo },
        out_date: { $lte: req.body.outDate },
        status: 1
    }).then(function(jobs) {
        if (req.session.user) {
            return res.render('find-job', { jobs: jobs, titles: titles, data: req.session.user });
        }
        return res.render('find-job', { jobs: jobs, titles: titles });
    })
});

module.exports = router;