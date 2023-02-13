const mongoose = require('mongoose')

// User Schema
const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be at most 20 characters long'],
      required: true
    },
    comment: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [280, 'Name must be at most 20 characters long'],
      required: true
    },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)


// Review Model
const Review = mongoose.model('Review', reviewSchema)

// Export
module.exports = Review
