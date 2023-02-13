const User = require('../models/User');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.favorites_movies_post = (request, response) => {
  User.findByIdAndUpdate(request.body.userId)
    .then(async (user) => {
      const film = await Movie.findById(request.body.movieId);
      user.favorites.push(film);
      user.save();
      response.json(user);
    })
    .catch((error) => {
      console.log("Error saving favorite movie");
      console.log(error);
    });
};

exports.favorites_movies_get = (request, response) => {
  User.findById(request.query.id)
    .then((user) => {
      response.json(user.favorites);
    })
    .catch((error) => {
      console.log("Error in getting favorite movies");
      console.log(error);
      response.status(500).send(error);
    });
};


exports.favorites_movies_delete = (request, response) => {
  User.findByIdAndUpdate(request.body.userId)
    .then(async (user) => {
      const film = await Movie.findById(request.body.movieId)
      user.favorites.remove(film);
      user.save()
      response.json(user);
    })
    .catch((error) => {
      console.log("Error deleting favorite movie");
      console.log(error);
    });
};

exports.user_info_get = (request, response) => {
  User.findById(request.query.id)
    .then((user) => {
      response.json(user);
    })
    .catch((error) => {
      console.log("Error in getting user info");
      console.log(error);
    })
}

exports.user_info_update = (request, response) => {
  User.findByIdAndUpdate(request.body._id, request.body, { new: true })
    .then((user) => {
      response.json(user);
    })
    .catch((error) => {
      console.log("Error updating user info");
      console.log(error);
    })
}

exports.user_reviews_get = (request, response) => {
  User.findById(request.query.id)
    .then((user) => {
      Review.find({ userId: user._id })
        .then((reviews => {
          response.json(reviews)
        }))
        .catch(error => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log("Error getting user reviews");
      console.log(error);
    })
}
