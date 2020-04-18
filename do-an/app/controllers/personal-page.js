var express = require("express");

var router = express.Router();

var user = require('../models/User');

router.get('/', function(req, res) {
    res.render('personal-page', {data: req.session.user});
});

router.post('/', (req, res) => {
    user.updateOne({_id: req.session.user._id}, {
        email: req.body.email,
        fullname: req.body.fullname,
        description: req.body.description
    }).then(data => {
        req.session.user.email = req.body.email;
        req.session.user.fullname = req.body.fullname;
        req.session.user.description = req.body.description;
        return res.render('personal-page', {data: req.session.user})
    })
} )

module.exports = router;