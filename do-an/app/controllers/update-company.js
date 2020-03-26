var express = require("express");

var router = express.Router();

var user = require('../models/User');

router.post('/', function(req, res) {
    user.updateOne({_id: req.session.user._id}, 
        { company: { 
            name: req.body.name, 
            website: req.body.website, 
            description: req.body.description,
            email: req.body.email
    }}).then(function(data) {
        return user.findById(req.session.user._id)
    }).then(function(data) {
        // req.session.user = data;
        // return res.render('my-company', { data: {role: 'company_user', company: data.company} });
        return res.render('my-company', { data: data });
    })
});

module.exports = router;