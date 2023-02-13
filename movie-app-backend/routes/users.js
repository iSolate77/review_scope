const router = require('express').Router();

const userController = require('../controllers/users');
const isLoggedIn = require('../helper/isLoggedIn');


router.get('/user/favorites', userController.favorites_movies_get);
router.post('/user/favorites/add', userController.favorites_movies_post);
router.delete('/user/favorites/delete', userController.favorites_movies_delete);
router.get('/user/info', isLoggedIn, userController.user_info_get);
router.put('/user/info/update', isLoggedIn, userController.user_info_update);
router.get('/user/reviews', isLoggedIn, userController.user_reviews_get);


module.exports = router;
