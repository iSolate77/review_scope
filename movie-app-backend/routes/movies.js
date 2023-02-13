const express = require('express');

const router = express.Router();

router.use(express.json());

let methodOverride = require("method-override");
router.use(methodOverride('_method'));

const isLoggedIn = require('../helper/isLoggedIn');
const movieCtrl = require('../controllers/movies');

router.get('/movie/index', movieCtrl.movie_index_get);
router.get('/movie/detail', movieCtrl.movie_show_get);
router.get('/movie/favorite', isLoggedIn, movieCtrl.movie_favorite_get);
router.get('/movie/search', movieCtrl.movie_search_get);

module.exports = router;
