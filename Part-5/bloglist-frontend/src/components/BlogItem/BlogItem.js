import React, { useState } from 'react'
import blogService from '../../services/blogs'
import './styles.css'

const Info = ({ blog, likes, likeHandler }) => {
    return (
        <>
            <div
                dangerouslySetInnerHTML={{
                    __html: `<a href=${blog.url} target='_blank'> Link </a>`,
                }}></div>
            <div>Likes : {likes}</div>
            <button onClick={likeHandler}> Like </button>
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
