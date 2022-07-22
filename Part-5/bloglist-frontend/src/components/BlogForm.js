import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitBlog = event => {
        event.preventDefault()

        createBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={submitBlog}>
                <div>
                    Title :{' '}
                    <input
                        id='title-input'
                        type='text'
                        name='Title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author :{' '}
                    <input
                        id='author-input'
                        type='text'
                        name='author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url :{' '}
                    <input
                        id='url-input'
                        type='text'
                        name='url'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='submit-blog' type='submit'> Submit </button>
            </form>
        </div>
    )
}

export default BlogForm
