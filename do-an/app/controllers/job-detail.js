var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var company = require('../models/Company');

router.get('/:id', function(req, res) {
    var jobDetail = {};
    job.findOne({_id: req.params.id}).then(function(data) {
        jobDetail = data.toObject();
        return company.findOne({_id: data.companyId});
    }).then(function(data) {
        jobDetail["companyImage"] = data.image;
        if(req.session.user) {
            if(!req.session.user.image.includes("../")) req.session.user.image = '../' + req.session.user.image;
            return res.render('job-detail', {job: jobDetail, data: req.session.user});
        }
        return res.render('job-detail', {job: jobDetail});
    })
});

module.exports = router;