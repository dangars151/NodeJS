var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var company = require('../models/Company');

// router.post('/', function(req, res) {
//     job.updateMany({ companyId: req.session.user.companyId }, {
//         companyName: req.body.name,
//         companyLocation: req.body.location
//     })
//     .then(function(data) {
//         return company.updateOne({_id: req.session.user.companyId}, {
//             name: req.body.name,
//             website: req.body.website, 
//             description: req.body.description,
//             email: req.body.email,
//             location: req.body.location
//     }).then(function(data) {
//             return company.findById(req.session.user.companyId);
//     }).then(function(company) {
//         res.render('my-company', { data: req.session.user, company: company });
//     }).catch(function(err) {
//         console.log(err);
//     })
// });

router.post('/', function(req, res) {
    job.updateMany({ companyId: req.session.user.companyId }, {
        companyName: req.body.name,
        companyLocation: req.body.location
    }).then(function(data) {
        return company.updateOne({ _id: req.session.user.companyId }, {
            name: req.body.name,
            website: req.body.website, 
            description: req.body.description,
            email: req.body.email,
            location: req.body.location
        })
    }).then(function(data) {
        return company.findById(req.session.user.companyId);
    }).then(function(company) {
        res.render('my-company', { data: req.session.user, company: company });
    }).catch(function(err) {
        console.log(err);
    })
})

module.exports = router;