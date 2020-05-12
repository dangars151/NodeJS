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
router.use('/save-job', require(__dirname + '/save-job'));
router.use('/save-job-list', require(__dirname + '/save-job-list'));
router.use('/job-detail', require(__dirname + '/job-detail'));
router.use('/cancel-save-job', require(__dirname + '/cancel-save-job'));
router.use('/handle-notification', require(__dirname + '/handle-notification'));
router.use('/apply-cv', require(__dirname + '/apply-cv'));
router.use('/get-notifications-company', require(__dirname + '/get-notifications-company'));
router.use('/call-video', require(__dirname + '/call-video'));
router.use('/join-room', require(__dirname + '/join-room'));
router.use('/accept-cv', require(__dirname + '/accept-cv'));
router.use('/send-mail', require(__dirname + '/send-mail'));
router.use('/personal-page', require(__dirname + '/personal-page'));
router.use('/user-detail', require(__dirname + '/user-detail'));
router.use('/company-detail', require(__dirname + '/company-detail'));
router.use('/follow-company', require(__dirname + '/follow-company'));
router.use('/events', require(__dirname + '/events'));
router.use('/recommend-email', require(__dirname + '/recommend-email'));
router.use('/event-reject', require(__dirname + '/event-reject'));
router.use('/event-accept', require(__dirname + '/event-accept'));
router.use('/event-cancel', require(__dirname + '/event-cancel'));
router.use('/event-update', require(__dirname + '/event-update'));

module.exports = router;