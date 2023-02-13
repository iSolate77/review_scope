const router = require('express').Router();

const authController = require('../controllers/auth');
const isLoggedIn = require('../helper/isLoggedIn')

router.get('/auth/signup', authController.auth_signup_get);
router.post('/auth/signup', authController.auth_signup_post);
router.get('/auth/login', authController.auth_signin_get);
router.post('/auth/login', authController.auth_signin_post);
router.get('/auth/logout', isLoggedIn, authController.auth_logout_get);

module.exports = router;

