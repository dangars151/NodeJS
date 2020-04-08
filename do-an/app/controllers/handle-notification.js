var express = require("express");

var router = express.Router();

var notification = require('../models/Notification');

router.post('/', function(req, res) {
    notification.updateMany({company_id: req.body.companyId}, {
        is_read: 1
    }).then(data => {
        return res.json(req.body.companyId);
    })
});

module.exports = router;