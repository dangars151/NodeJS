var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    res.render('my-company', { data: {role: 'company_user'} });
});

module.exports = router;