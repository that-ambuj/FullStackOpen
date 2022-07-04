const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const userExtractor = require("../utils/userExtractor")

blogsRouter.get("/", async (_, response) => {
   const blogs = await Blog.find({}).populate("user")

   return response.json(blogs).end()
})

blogsRouter.get("/:id", async (_, response) => {
   const blog = await Blog.findById(request.params.id)

   if (blog) {
      response.json(blog)
   } else {
      response.status(404).end()
   }
})

blogsRouter.post("/",userExtractor, async (request, response) => {
   const authedUser = await request.user
   console.log(authedUser)
   if (!authedUser.id) {
      return response.status(401).json({ error: "token missing or invalid" })
   }

   const blog = new Blog({ ...request.body, user : authedUser })
   const savedBlog = await blog.save()

   authedUser.blogs = authedUser.blogs.concat(savedBlog._id)
   await authedUser.save()

   response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id",userExtractor, async (request, response) => {
   const blog = await Blog.findById(request.params.id)
   const authedUser = await request.user

   if (!authedUser._id) {
      return response.status(401).json({ error: "token missing or invalid" })
   }
   const userId = await authedUser.id

   if ( blog.user.toString() === userId.toString() ) {     
      await User.updateOne({ _id : userId}, {
         $pullAll : {
            blogs : [{_id : request.params.id}]
         }
      })
      await Blog.findOneAndDelete(blog)

      return response.status(204).end()
   }

   return response.status(400).end()
})



// blogsRouter.put("/:id", async (request, response) => {
//    const body = request.body

//    const blog = {
//       likes: body.likes,
//    }

//    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
//       new: true,
//    })

//    response.json(updatedBlog)
// })


module.exports = blogsRouter
