var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    //res.render('my-company', { data: {role: 'company_user', company: req.session.user.company} });
    res.render('my-company', { data: req.session.user });
});

module.exports = router;