const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogsRouter.get("/", async (request, response) => {
   const blogs = await Blog.find({}).populate("user")

   response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
   
   const decodedToken = await jwt.verify(request.token, process.env.SECRET)

   if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
   }
   const authedUser = await User.findById(decodedToken.id)

   const blog = new Blog({ ...request.body, user : authedUser })

   const savedBlog = await blog.save()

   authedUser.blogs = authedUser.blogs.concat(savedBlog._id)
   await authedUser.save()

   response.status(201).json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
   const blog = await Blog.findById(request.params.id)

   if (blog) {
      response.json(blog)
   } else {
      response.status(404).end()
   }
})

blogsRouter.delete("/:id", async (request, response) => {
   await Blog.findByIdAndDelete(request.params.id)

   response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
   const body = request.body

   const blog = {
      likes: body.likes,
   }

   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
   })

   response.json(updatedBlog)
})


module.exports = blogsRouter
