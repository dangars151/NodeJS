var express = require("express");

var router = express.Router();

var user = require('../models/User');

router.post('/', function(req, res) {
    user.find({email: new RegExp(req.body.data)}, {email: 1})
    .then(data => {
        res.json(data);
    })
});

module.exports = router;