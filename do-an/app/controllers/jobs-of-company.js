var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    res.render('jobs-of-company', { data: req.session.user });
});

module.exports = router;