const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// User Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name must be at most 20 characters long'],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name must be at most 20 characters long'],
    },
    username: {
      type: String,
      required: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', unique: true }]
  },
  { timestamps: true }
)

// validPassword
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

// User Model
const User = mongoose.model('User', userSchema)

// Export
module.exports = User
