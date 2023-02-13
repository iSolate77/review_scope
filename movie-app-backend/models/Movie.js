const mongoose = require('mongoose')

// User Schema
const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    releaseDate: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    trailer_url : { type: String, required: true },
    rating: { type: Number, required: true },
    reviews : [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
  },
  { timestamps: true }
)


// Review Model
const Movie = mongoose.model('Movie', movieSchema)

// Export
module.exports = Movie
