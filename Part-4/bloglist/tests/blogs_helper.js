const lodash = require("lodash")

const totalLikes = (arrayOfBlogs) => {
   if (arrayOfBlogs.length === 0) {
      return 0
   }
   return arrayOfBlogs.map((obj) => obj.likes).reduce((a, b) => a + b)
}

const favouriteBlog = (arrayOfBlogs) => {
   return arrayOfBlogs.sort((a, b) => {
      return a.likes - b.likes
   })[arrayOfBlogs.length - 1]
}

const mostBlogs = (arrayOfBlogs) => {
   const authEntries = Object.entries(lodash.countBy(arrayOfBlogs, "author"))
   const max = lodash.last(authEntries.sort((a, b) => a[1] - b[1]))

   const maxObj = {
      author: max[0],
      blogs: max[1],
   }
   return maxObj
}

const mostLikes = (arrayOfBlogs) => {
   const mapped = arrayOfBlogs.map((obj) => {
      return {
         author: obj.author,
         likes: obj.likes,
      }
   })
   
   const out = mapped.reduce((a, o) => {
      return a[o.author] 
         ? (a[o.author].likes += o.likes) 
         : (a[o.author] = o), a
   }, {})
   
   const maxLikesArr = Object.entries(out).map(each => each[1])
   return lodash.last(maxLikesArr.sort((a,b) => (a.likes - b.likes)))
}

module.exports = { totalLikes, favouriteBlog, mostBlogs, mostLikes }
