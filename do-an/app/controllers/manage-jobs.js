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

// router.post('/search', function(req, res) {
//     job.find({
//         title: new RegExp(req.body.title),
//         companyName: new RegExp(req.body.company),
//         companyLocation: new RegExp(req.body.location),
//         status: 0
//     }).then(function(jobs) {
//         if (req.body.sort == 'outDate') {
//             jobs.sort(function(job1, job2) {
//                 return job2.out_date - job1.out_date;
//             });
//         } else if (req.body.sort == 'createdAt') {
//             jobs.sort(function(job1, job2) {
//                 return job1.created_at - job2.created_at ;
//             });
//         } else {
//             jobs.sort(function(job1, job2) {
//                 return  job2.created_at - job1.created_at;
//             });
//         }
//         return res.render('manage-jobs', { jobs: jobs });
//     })
// })

module.exports = router;