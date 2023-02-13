const Review = require('../models/Review');
const Movie = require('../models/Movie');
const User = require('../models/User');


exports.review_create_get = (request, response) => {
  response.render('review/create');
}

exports.review_create_post = (request, response) => {
  let review = new Review(request.body)
  review.save()
    .then((reviews) => {
      Movie.findById(request.body.movieId, (error, film) => {
        film.reviews.push(reviews)
        film.save()
      })
      User.findById(request.body.userId, (error, user) => {
        user.reviews.push(reviews)
        user.save()
      })
      response.json(reviews)
    })
    .catch((error) => {
      console.log('Error saving review')
      console.log(error)
    })
}

exports.review_index_get = (request, response) => {
  Review.find()
    .then((review) => {
      response.json(review);
    })
    .catch((error) => {
      console.log('Error in getting reviews');
      console.log(error);
    })
}

exports.reviewByMovieTitle_index_get = (request, response) => {
  Movie.find({title: request.query.title})
  .then(movie => {
    movie = movie[0];
    Review.find({movieId: movie._id})
    .then((review) => {
      response.json(review);
    })
    .catch((error) => {
      console.log('Error in getting reviews');
      console.log(error);
    })
  })
  .catch(error =>{
    console.log(error);
  })

}

exports.review_edit_get = (request, response) => {
  Review.findById(request.query.id)
    .then((review) => {
      response.json(review)
    })
    .catch((error) => {
      console.log('Error finding review')
      console.log(error)
    })
}

exports.review_edit_put = (request, response) => {
  Review.findByIdAndUpdate(request.body._id, request.body, { new: true })
    .then((review) => {
      response.json(review)
    })
    .catch((error) => {
      console.log('Error updating review')
      console.log(error)
    })
}

exports.review_delete_get = (request, response) => {
  Review.findByIdAndDelete(request.query.id)
    .then((review) => {
      response.json({ review })
      console.log('Review deleted')
    })
    .catch((error) => {
      console.log('Error deleting review')
      console.log(error)
    })
}
