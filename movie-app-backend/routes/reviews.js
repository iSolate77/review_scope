const express = require('express');

const router = express.Router();

router.use(express.json());

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

const isLoggedIn = require('../helper/isLoggedIn');

const reviewCtrl = require('../controllers/reviews');

router.get('/review/index', reviewCtrl.review_index_get);
router.get('/review/movie', reviewCtrl.reviewByMovieTitle_index_get);
router.get('/review/add', isLoggedIn, reviewCtrl.review_create_get);
router.post('/review/add', isLoggedIn, reviewCtrl.review_create_post);

router.get('/review/edit', isLoggedIn, reviewCtrl.review_edit_get);
router.put('/review/update', isLoggedIn, reviewCtrl.review_edit_put);

router.delete('/review/delete', isLoggedIn, reviewCtrl.review_delete_get);

module.exports = router;
