// import config, express, and CORS
const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
// import express async await error handler 
require('express-async-errors')
// import routers
const loginRouter = require("./controllers/login")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
// import middleware for logging, error handling and database
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info("connecting to mongodb")

mongoose
   .connect(config.MONGODB_URI)
   .then(() => {
      logger.info("connected to MongoDB")
   })
   .catch((error) => {
      logger.error("error connecting to MongoDB :", error.message)
   })

// use cross origin resource sharing
app.use(cors())
// use express json parser
app.use(express.json())
// use request logging middleware
app.use(middleware.requestLogger)
// setup routers
app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)
// use custom error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app