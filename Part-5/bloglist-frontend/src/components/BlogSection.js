import React, { useState, useEffect, useRef, createContext } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import BlogItem from './BlogItem/index'
import Togglable from './Togglable'

export const BlogListContext = createContext()

const BlogNotif = ({ notif }) => {
    if (notif) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    borderRadius: '8px',
                    background: '#00BFA5',
                    padding: '10px 20px',
                    fontWeight: '500',
                    margin: '10px',
                    width: '400px',
                }}>
                New Blog {notif.title} by {notif.author} added.
            </div>
        )
    }
}

const BlogSection = () => {
    const [blogs, setBlogs] = useState([])
    const [notif, setNotif] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        (async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        })()
    }, [])

    const submitBlog = blogObject => {
        blogFormRef.current.toggleVisibility()
        blogService.createBlog(blogObject).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
        })
        setNotif(blogObject)
        setTimeout(() => {
            setNotif(null)
        }, 5000)
    }

    return (
        <div>
            {notif && <BlogNotif notif={notif} />}
            <h2>Create New Blog</h2>
            <Togglable id='create-blog' buttonLabel='Create Blog' ref={blogFormRef}>
                <BlogForm createBlog={submitBlog} />
            </Togglable>
            <BlogListContext.Provider value={{ blogs, setBlogs }}>
                {blogs
                    .sort((a, b) => (a.likes - b.likes) * -1)
                    .map(blog => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
            </BlogListContext.Provider>
        </div>
    )
}

export default BlogSection
