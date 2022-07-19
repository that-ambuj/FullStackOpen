import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    blogs.map(blog => { return (
        <>
            <div>{blog.title}</div>
            <div>{blog.author}</div>
        </>
    )})
}

export default BlogList
