
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const userExtractor = async (request, response, next) => {
   const authorization = request.get("authorization")

   const token = await authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.substring(7)
      : null
   const decodedToken = jwt.verify(token, config.SECRET)
   const user = await User.findById(decodedToken.id)
   
   request.user = user
   next()
}

module.exports = userExtractor