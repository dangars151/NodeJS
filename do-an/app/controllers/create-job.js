var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var company = require('../models/Company');
var work = require('../models/Work');

router.get('/', function(req, res) {
    work.find().then(data => {
        if (req.session.user) {
            res.render('create-job', { data: req.session.user, works: data });
        } else {
            res.redirect('/login');
        }
    })
});

router.post('/', function(req, res) {
    var request = req.body;
    var jobsId = [];
    company.findOne({ _id: req.session.user.companyId }).then(function(data) {
        jobsId = data.jobsId;
        return job.create({
            title: request.title,
            salary_from: request.salaryFrom,
            salary_to: request.salaryTo,
            out_date: request.outDate,
            created_at: Date.now(),
            description: request.description,
            status: 0,
            companyId: data._id,
            companyName: data.name,
            companyLocation: data.location,
            companyImage: data.image,
            name: request.name,
            workId: request.work
        })
    }).then(function(data) {
        jobsId.push(data._id);
        return jobsId;
    }).then(function(jobsId) {
        company.updateOne({ _id: req.session.user.companyId }, {
            jobsId: jobsId
        }).then(function(data) {
            work.find().then(works => {
                return res.render('create-job', { data: req.session.user, msg: 'Tạo việc thành công! Hãy đợi admin phê duyệt!', works: works });
            })
        })
    })
});

module.exports = router;