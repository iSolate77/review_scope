const Movie = require('../models/Movie');
const User = require('../models/User');

exports.movie_index_get = (request, response) => {
  Movie.find()
    .then((movie) => {
      response.json(movie);
    })
    .catch((error) => {
      console.log('Error in getting movies');
      console.log(error);
    });
}

exports.movie_show_get = (request, response) => {
  Movie.findById(request.query.id).populate('reviews')
    .then((movie) => {
      response.json(movie);
    })
    .catch((error) => {
      console.log('Error in getting movie');
      console.log(error);
    })
}

exports.movie_favorite_get = async (request, response) => {
  try {
    let user = await User.findById(request.query.id)
    let favMovies = user.favorites
    let res = []
    for (let i = 0; i < favMovies.length; i++) {
      res.push(await Movie.findById(favMovies[i]))
    };
    response.json(res);
  } catch (error) {
    console.log('Error in getting movie');
    console.log(error);
  }
}

exports.movie_search_get = (request, response) => {
  const searchQuery = request.query.query;
  Movie.find({ title: { $regex: new RegExp(searchQuery, "i") } })
    .then((movie) => {
      response.json(movie);
    })
    .catch((error) => {
      console.log('Error in getting movie');
      console.log(error);
    })
}
