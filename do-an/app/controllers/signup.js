var express = require("express");

var user = require('../models/User');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('signup');
});

router.post('/', function(req, res) {
    var request = req.body;
    if (typeof(request.emailCandidate) != 'undefined') {
        user.create({
            email: request.emailCandidate, 
            password: request.passwordCandidate, 
            role: 'candidate_user',
            fullname: request.fullname
        }).then(function(data){
            return res.render('main', { data: { role: 'candidate_user' } } );
        })
    } else {
        user.create({
            email: request.emailCompany, 
            password: request.passwordCompany, 
            role: 'company_user',
            company: { name: request.company }
        }).then(function(data){
            return res.render('main', { data: { role: 'company_user' } } );
        })
    }
});

module.exports = router;