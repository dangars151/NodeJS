var express = require("express");

var router = express.Router();

var notification = require('../models/Notification');

router.get('/', function(req, res) {
    notification.find({company_id: req.query.companyId}).sort({created_at: -1})
    .then(data => {
        return res.json(data);
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;