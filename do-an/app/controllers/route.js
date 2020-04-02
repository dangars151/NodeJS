var express = require("express");

var router = express.Router();

// router.get('/admin-menu', function(req, res) {
//     res.render('admin-menu');
// });

router.use('/', require(__dirname + '/main'));
router.use('/login', require(__dirname + '/login'));
router.use('/signup', require(__dirname + '/signup'));
router.use('/signout', require(__dirname + '/signout'));
router.use('/my-company', require(__dirname + '/my-company'));
router.use('/create-job', require(__dirname + '/create-job'));
router.use('/find-job', require(__dirname + '/find-job'));
router.use('/update-company', require(__dirname + '/update-company'));
router.use('/manage-jobs', require(__dirname + '/manage-jobs'));
router.use('/manage-main', require(__dirname + '/manage-main'));
router.use('/manage-users', require(__dirname + '/manage-users'));
router.use('/manage-companies', require(__dirname + '/manage-companies'));
router.use('/jobs-of-company', require(__dirname + '/jobs-of-company'));
router.use('/manage-company-detail', require(__dirname + '/manage-company-detail'));
router.use('/find-job-advance', require(__dirname + '/find-job-advance'));

module.exports = router;