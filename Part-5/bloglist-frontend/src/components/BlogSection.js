import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogItem from './BlogItem/index'

export const BlogNotif = ({ notif }) => {
    if (notif) {
        return (
            <div style={{
                textAlign : 'center',
                borderRadius : '8px',
                background : '#00BFA5',
                padding : '10px 20px',
                fontWeight : '500',
                margin : '10px',
                width : '400px'
            }}>
                New Blog {notif.title} by {notif.author} added.
            </div>
        )
    }
}

const BlogSection = () => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notif, setNotif] = useState(null)

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
            setNotif(newBlog)
            setTimeout(() => {
                setNotif(null)
            }, 5000);
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
            {notif && <BlogNotif notif={notif} />}
            <h2>Create New Blog</h2>
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

export default BlogSection 
