const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeAll(async () => {
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

describe("when POSTing a blog", () => {
   test("number of blogs is +1T", async () => {
      await api.post("/api/blogs").send(helper.testBlogWithLikes).expect(201)
      const afterPost = await api.get("/api/blogs")

      expect(afterPost.body).toHaveLength(helper.initialBlogs.length + 1)
   })

   test("new blog is in the list", async () => {
      const request = await api
         .post("/api/blogs")
         .send(helper.testBlogWithLikes)
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
      await api.post("/api/blogs").send(helper.malformattedBlog).expect(400)
   })
})

describe("GETting a blog by ID", () => {
   test("correct id gives status code 200", async () => {
      const result = await api.get("/api/blogs/5a422b891b54a676234d17fa")

      expect(result.status).toEqual(200)
   })
   test("non existing id gives status code 400", async () => {
      await api.get("/api/blogs/asdlkfj1091").expect(400)
   })
   test("incorrect id format gives status code 404", async () => {
      await api.get("/api/blogs/62bb21187c594ff40b94c8ad").expect(404)
   })
   test("has expected title wrt id", async() => {
      const blog = await api.get("/api/blogs/5a422b891b54a676234d17fa")

      expect(blog.body.title).toEqual("First class tests")
   })
})

describe("DELETEing a blog by ID", () => {
   test("gives status code 204", async () => {
      await api.delete("/api/blogs/5a422ba71b54a676234d17fb").expect(204)
   })
})

describe("PUTting a blog by ID", () => {
   test("updated likes is same as PUT likes", async() => {
      likesTo = 24
      const result = await api.put("/api/blogs/5a422a851b54a676234d17f7").send({"likes" : `${likesTo}`})

      expect(result.body.likes).toEqual(likesTo)
   })
})

afterAll(() => {
   mongoose.connection.close()
})
