var express = require("express");

var user = require('../models/User');
var job = require('../models/Job');

var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res) {
    res.render('signup');
});

router.post('/', function(req, res) {
    var jobs;
    job.find().then(function(data) {
        jobs = data;
    })
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
       

    if (typeof(fields.emailCandidate) != 'undefined') {
        var oldpath = files.imgCandidate.path;
        var newpath = 'public/images/' + files.imgCandidate.name;
        fs.rename(oldpath, newpath, function (err) {
            
        });
        user.create({
                email: fields.emailCandidate, 
                password: fields.passwordCandidate, 
                role: 'candidate_user',
                fullname: fields.fullname,
                image: newpath
        }).then(function(data){
            req.session.user = data;
            return res.render('main', { data: data, jobs: jobs } );
    })} else {
        var oldpath = files.imgCompany.path;
        var newpath = 'public/images/' + files.imgCompany.name;
        fs.rename(oldpath, newpath, function (err) {
            
        });
        user.create({
            email: fields.emailCompany, 
            password: fields.passwordCompany, 
            role: 'company_user',
            image: newpath,
            company: { name: fields.company, image: newpath },
        }).then(function(data){
            req.session.user = data;
            return res.render('main', { data: data, jobs: jobs } );
        })
    }
    });

    // if (typeof(request.emailCandidate) != 'undefined') {
    //     console.log('tyuiuivb');
    //     var newpath;
       
    //     console.log(newpath);
    //     console.log('fghjyucvb');
    //     user.create({
    //         email: request.emailCandidate, 
    //         password: request.passwordCandidate, 
    //         role: 'candidate_user',
    //         fullname: request.fullname,
    //         image: newpath
    //     }).then(function(data){
    //         req.session.user = data;
    //         return res.render('main', { data: { role: 'candidate_user' }, jobs: jobs } );
    //     })
    // } else {
    //     user.create({
    //         email: request.emailCompany, 
    //         password: request.passwordCompany, 
    //         role: 'company_user',
    //         company: { name: request.company }
    //     }).then(function(data){
    //         req.session.user = data;
    //         return res.render('main', { data: { role: 'company_user' }, jobs: jobs } );
    //     })
    // }
});

module.exports = router;