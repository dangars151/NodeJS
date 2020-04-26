var express = require("express");

var router = express.Router();

var company = require('../models/Company');

router.get('/:id', function(req, res) {
    company.findOne({_id: req.params.id}).then(function(data) {
        if(req.session.user) {
            if(!req.session.user.image.includes("../")) req.session.user.image = '../' + req.session.user.image;
            return res.render('company-detail', {company: data, data: req.session.user});
        }
        return res.render('company-detail', {company: data});
    })
});

module.exports = router;