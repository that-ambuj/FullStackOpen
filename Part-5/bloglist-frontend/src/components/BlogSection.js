import React  from 'react'
import BlogList from './BlogList'
import CreateBlog from './CreateBlog'

const BlogSection = ({ blog }) => {
    return (
        <div>
            <CreateBlog />
            <BlogList />
        </div>
    )
}
export default BlogSection
