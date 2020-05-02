var express = require("express");

var router = express.Router();

var company = require('../models/Company');
var job = require('../models/Job');

router.get('/:id', function(req, res) {
    var companyDetail;
    var jobsOfCompany;
    company.findOne({_id: req.params.id}).then(function(data) {
        companyDetail = data;
        return job.find({companyId: req.params.id});
    }).then(data => {
        jobsOfCompany = data;
        if(req.session.user) {
            if(!req.session.user.image.includes("../")) req.session.user.image = '../' + req.session.user.image;
            return res.render('company-detail', {company: companyDetail, data: req.session.user, jobsOfCompany: jobsOfCompany});
        }
        return res.render('company-detail', {company: companyDetail, jobsOfCompany: jobsOfCompany});
    })
});

module.exports = router;