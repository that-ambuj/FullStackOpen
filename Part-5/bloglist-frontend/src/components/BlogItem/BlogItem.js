import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import blogService from '../../services/blogs'
import { BlogListContext } from '../BlogSection'
import './styles.css'

const Info = ({ blog, likes, likeHandler }) => {
    const user = useContext(UserContext)
    const {blogs, setBlogs} = useContext(BlogListContext)

    const deleteVisibility = {
        display: user.username === blog.user.username ? '' : 'none',
    }

    console.log(blogs)

    const deleteBlog = () => {
        blogService.deleteBlog(blog)

        setBlogs(blogs.filter(bl => bl.id !== blog.id))
    }

    return (
        <>
            <div
                dangerouslySetInnerHTML={{
                    __html: `<a href=${blog.url} target='_blank'> Link </a>`,
                }}></div>
            <div>Likes : {likes}</div>
            <button onClick={likeHandler}> Like </button>
            <button style={deleteVisibility} onClick={deleteBlog}>
                Delete
            </button>
        </>
    )
}
const BlogItem = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const addLike = () => {
        blogService
            .increaseLikes({ ...blog, likes: likes + 1 })
            .then(returnedBlog => setLikes(returnedBlog.likes))
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div className='box'>
            <div className='title'>{blog.title}</div>
            <div className='author'>{blog.author}</div>
            <button onClick={toggleVisibility}>
                {visible ? 'hide' : 'show'}
            </button>
            {visible && (
                <Info blog={blog} likes={likes} likeHandler={addLike} />
            )}
        </div>
    )
}
export default BlogItem
