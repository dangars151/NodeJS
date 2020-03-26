var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user) {
        res.render('create-job', { data: {role: 'company_user'} });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;