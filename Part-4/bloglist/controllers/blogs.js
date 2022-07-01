const blogsRouter = require("express").Router()
const { random } = require("lodash")
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
   const blogs = await Blog.find({}).populate('user')

   response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
   const users = await User.find({})
   const randInt = Math.floor(Math.random() * users.length)

   console.log(users[randInt]["_id"])
   const randomUserId = users[randInt]["_id"]

   console.log(randomUserId)

   const blog = new Blog({...request.body, user : randomUserId})

   const savedBlog = await blog.save()

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
