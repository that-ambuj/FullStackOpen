import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    const loginUser = async event => {
        event.preventDefault()

        const userCreds = {
            username: username,
            password: password,
        }

        try {
            const user = await loginService.login(userCreds)
            setUsername('')
            setPassword('')
            setUser(user)
        } catch (error) {
            setErrorMessage('Wrong Credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (user) {
        return (
            <>
                <h1>Blogs</h1>
                <div>{user.name} is logged in.</div>
                {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </>
        )
    }

    return (
        <>
            <h1>Login to the App</h1>
            <form onSubmit={loginUser}>
                <div>
                    Username :{' '}
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password :{' '}
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default App
