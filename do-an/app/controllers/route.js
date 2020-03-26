var express = require("express");

var router = express.Router();

// router.get('/', function(req, res) {
//     res.render('main');
// });

router.use('/', require(__dirname + '/main'));
router.use('/login', require(__dirname + '/login'));
router.use('/signup', require(__dirname + '/signup'));
router.use('/signout', require(__dirname + '/signout'));
router.use('/my-company', require(__dirname + '/my-company'));
router.use('/create-job', require(__dirname + '/create-job'));
router.use('/find-job', require(__dirname + '/find-job'));
router.use('/update-company', require(__dirname + '/update-company'));

module.exports = router;