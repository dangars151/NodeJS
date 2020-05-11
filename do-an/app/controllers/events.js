var express = require("express");

var router = express.Router();

var event = require('../models/Event');

router.get('/', function(req, res) {
    event.find({creator_id: req.session.user._id})
    .then(data => {
        return res.render('events', { data: req.session.user, events: data } );
    })
    
});

router.get('/:id', (req, res) => {
    if (req.session.user) {
        if(!req.session.user.image.includes("../")) req.session.user.image = '../' + req.session.user.image;
        event.findOne({_id: req.params.id})
        .then(data => {
            if (!data) return res.render('event-detail', { data: req.session.user, msg: 'Sự kiện này đã bị hủy' });
            return res.render('event-detail', { data: req.session.user, event: data });
        }).catch(err => {
            console.log(err);
        })
    }
})

module.exports = router;