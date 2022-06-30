const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
   await Blog.deleteMany({})
   await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
   await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
})

test ("blogs have id and not _id", async () => {
   const response = await api.get("/api/blogs")

   // ? does not check each object
   expect(response.body[0].id).toBeDefined()
})

test("number of blogs is +1 after POST", async () => {
   const testBlog = {
      title : "might delete soon",
      url : "nowhere",
      author : "noOne",
      likes : 69
   }

   const request = await api.post("/api/blogs").send(testBlog)

   const afterPost = await api.get("/api/blogs")

   expect(afterPost.body).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(() => {
   mongoose.connection.close()
})
