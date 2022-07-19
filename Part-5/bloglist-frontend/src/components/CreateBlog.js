import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitBlog = event => {
        event.preventDefault()

        if (title && author && url) {
            const newBlog = {
                title: title,
                author: author,
                url: url,
            }

            blogService.createBlog(newBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }
    return (
        <div>
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
        </div>
    )
}

export default CreateBlog
