import React, { useEffect, useState } from 'react'
import BlogSection from './components/BlogSection'
import loginService from './services/login'
import blogService from './services/blogs'

export const ErrorDialog = ({ message }) => {
    return (
        <div
            style={{
                color : 'white',
                fontWeight : 'bold',
                padding: '10px 20px',
                width: '200px',
                borderRadius: '8px',
                textAlign : 'center',
                margin : '10px',
                backgroundColor : '#b00020'
            }}>
            {message}
        </div>
    )
}

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(() => {
        const appUserJSON = window.localStorage.getItem("appUser")
        if (appUserJSON) {
            const user = JSON.parse(appUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
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
            window.localStorage.setItem(
                "appUser", JSON.stringify(user)
            )
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
                <BlogSection />
            </>
        )
    }

    return (
        <div style={{ fontFamily : 'system-ui, sans-serif'}}>
            <h1>Login to the App</h1>
            {errorMessage && <ErrorDialog message={errorMessage} />}
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
        </div>
    )
}

export default App
