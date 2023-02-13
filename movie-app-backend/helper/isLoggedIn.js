const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (request, response, next) => {
  let token = ""
  let authorizationToken = request.header("Authorization")
  if (authorizationToken) authorizationToken = authorizationToken.replace("Bearer ", ""); 
  token = authorizationToken; 
  if (!token) return response.status(401).json({ "message": "Unauthorized" })
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET)
    request.user = decoded.user
    next()
  }
  catch (error) {
    return response.status(401).json({ "message": "Your token is invalid" })
  }
}
