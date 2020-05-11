var express = require("express");

var router = express.Router();

var event = require('../models/Event');

router.post('/', (req, res) => {
    event.deleteOne({_id: req.body.eventId})
    .then(data => {
        return event.find({creator_id: req.session.user._id});
    }).then(data => {
        return res.render('events', {data: req.session.user, events: data})
    })
})

module.exports = router;