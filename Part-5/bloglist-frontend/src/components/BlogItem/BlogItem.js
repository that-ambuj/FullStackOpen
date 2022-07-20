import React, { useState } from 'react'
import './styles.css'

const Info = ({ blog, likeHandler }) => {
    return (
        <>
            <div>{blog.url}</div>
            <div>Likes : {blog.likes}</div>
            <button onSubmit={likeHandler}> Like </button>
        </>
    )
}
const BlogItem = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const addLike = () => {}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div className='box'>
            <div className='title'>{blog.title}</div>
            <div className='author'>{blog.author}</div>
            <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
            {visible && <Info blog={blog} likeHandler={addLike} />}
        </div>
    )
}
export default BlogItem
