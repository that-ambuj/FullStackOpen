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

test("blogs have id and not _id", async () => {
   const response = await api.get("/api/blogs")

   // ? does not check each object
   expect(response.body[0].id).toBeDefined()
})

test("number of blogs is +1 after POST", async () => {
   await api.post("/api/blogs").send(helper.testBlogWithLikes).expect(201)
   const afterPost = await api.get("/api/blogs")

   expect(afterPost.body).toHaveLength(helper.initialBlogs.length + 1)
})

test("blog is in the list after POST", async () => {
   const request = await api.post("/api/blogs").send(helper.testBlogWithLikes)
   const afterPost = await api.get("/api/blogs")

   expect(afterPost.body).toContainEqual(request.body)
})

test("blog without likes defaults likes = 0", async () => {
   const request = await api
      .post("/api/blogs")
      .send(helper.testBlogWithoutLikes)

   expect(request.body.likes).toEqual(0)
})

test("malformatted blog gives code 400", async () => {
   await api
      .post("/api/blogs")
      .send(helper.malformattedBlog)
      .expect(400)
})

afterAll(() => {
   mongoose.connection.close()
})
