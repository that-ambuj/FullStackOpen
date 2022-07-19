import React from 'react'

const style = {
    author: {
        fontWeight: 300,
    },
    title: {
        fontWeight: 500,
    },
}

const BlogItem = ({ blog }) => (
    <div>
        <div style={style.title}>{blog.title}</div>
        <div style={style.author}>{blog.author}</div>
    </div>
)

export default BlogItem
