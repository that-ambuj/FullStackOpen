import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogItem from './BlogItem'

const BlogList = () => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        (async () => {{
            const blogs = await blogService.getAll()
            await setBlogs(blogs)
        }})()
    }, [])


    const submitBlog = event => {
        event.preventDefault()
        if (title && author && url) {
            const newBlog = {
                title: title,
                author: author,
                url: url,
            }

            blogService.createBlog(newBlog).then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
            <h1>Create New Blog</h1>
            <form onSubmit={submitBlog}>
                <div>
                    Title :{' '}
                    <input
                        type='text'
                        name='Title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author :{' '}
                    <input
                        type='text'
                        name='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url :{' '}
                    <input
                        type='text'
                        name='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'> Submit </button>
            </form>
            <div>
                {blogs.map(blog => (
                    <BlogItem key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default BlogList
