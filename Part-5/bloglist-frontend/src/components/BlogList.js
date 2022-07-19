import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogItem from './BlogItem'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        (async () => {
            const response = await blogService.getAll()
            return setBlogs(response)
        })()
    }, [])

    return blogs.map(blog => <BlogItem key={blog.id} blog={blog} />)
}

export default BlogList
