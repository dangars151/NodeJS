var express = require("express");

var router = express.Router();

var company = require('../models/Company');

router.get('/', function(req, res) {
    //res.render('my-company', { data: {role: 'company_user', company: req.session.user.company} });
    company.findOne({ _id: req.session.user.companyId }).then(function(company){
        res.render('my-company', { data: req.session.user, company: company });
    })
});

module.exports = router;