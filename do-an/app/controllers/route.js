var express = require("express");

var router = express.Router();

// router.get('/', function(req, res) {
//     res.render('main');
// });

router.use('/', require(__dirname + '/main'));
router.use('/login', require(__dirname + '/login'));
router.use('/signup', require(__dirname + '/signup'));
router.use('/my-company', require(__dirname + '/my-company'));
router.use('/create-job', require(__dirname + '/create-job'));

module.exports = router;