import React from 'react'
import './styles.css'

const BlogItem = ({ blog }) => (
    <div className='box'>
        <div className='title'>{blog.title}</div>
        <div className='author'>{blog.author}</div>
    </div>
)

export default BlogItem
