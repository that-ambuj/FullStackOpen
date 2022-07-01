const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const passwordValidator = require("password-validator")

const passwordSchema = new passwordValidator()
                                       .is().min(8)
                                       .has().lowercase()
                                       .has().digits(2)
                                       .has().symbols()
                                       .has().not().spaces()

   

usersRouter.get("/", async (request, response) => {
   const users = await User.find({})

   response.json(users)
})

usersRouter.post("/", async (request, response) => {
   const { username, name, password } = request.body

   const existingUser = await User.findOne({ username })

   if (existingUser) {
      return response.status(400).json({
         error: "username must be unique",
      })
   }

   const passwordIsValid = await passwordSchema.validate(password)
   
   if (!passwordIsValid) {
      return response
         .status(406)
         .json({
            error: "password must have at least 8 characters, including digits and symbols.",
         })
   }

   const saltRounds = 10
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const user = new User({
      username,
      name,
      passwordHash,
   })

   const savedUser = await user.save()

   response.status(201).json(savedUser)
})

module.exports = usersRouter
