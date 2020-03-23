var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    res.render('create-job', { data: {role: 'company_user'} });
});

module.exports = router;