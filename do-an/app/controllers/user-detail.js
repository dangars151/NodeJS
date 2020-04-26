var express = require("express");

var router = express.Router();

var user = require('../models/User');

router.get('/:id', function(req, res) {
    user.findOne({_id: req.params.id})
    .then(data => {
        if(!req.session.user.image.includes("../")) req.session.user.image = '../' + req.session.user.image;
        return res.render('user-detail', {data: req.session.user, userDetail: data})
    })
});

module.exports = router;