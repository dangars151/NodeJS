var express = require("express");

var router = express.Router();

router.get('/', function(req, res) {
    res.render('main');
});

router.use('/login', require(__dirname + '/login'));
router.use('/signup', require(__dirname + '/signup'));

module.exports = router;