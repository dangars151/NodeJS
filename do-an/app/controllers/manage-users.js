var express = require("express");

var router = express.Router();
var user = require('../models/User');

router.get('/', function(req, res) {
    user.find().then(function(data) {
        res.render('manage-users', { users: data });
    })
});

module.exports = router;
