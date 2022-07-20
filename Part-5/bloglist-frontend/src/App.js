import React, { useEffect, useState, createContext } from 'react'
import BlogSection from './components/BlogSection'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const ErrorDialog = ({ message }) => {
    return (
        <div
            style={{
                color: 'white',
                fontWeight: '500',
                padding: '10px 20px',
                width: '400px',
                borderRadius: '8px',
                textAlign: 'center',
                margin: '10px',
                backgroundColor: '#b00020',
            }}>
            {message}
        </div>
    )
}



export const UserContext = createContext(null)

const App = () => {
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const appUserJSON = window.localStorage.getItem('appUser')
        if (appUserJSON) {
            const user = JSON.parse(appUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const loginUser = async userObject => {
        try {
            const user = await loginService.login(userObject)
            window.localStorage.setItem('appUser', JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
        } catch (error) {
            setErrorMessage('Wrong Username or Password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const logout = () => {
        if (window.localStorage.getItem('appUser')) {
            window.localStorage.clear()
            setUser(null)
        }
    }

    if (user) {
        return (
            <>
                <UserContext.Provider value={user}>
                    <h1>Blogs</h1>
                    <div>{user.name} is logged in.</div>
                    <button onClick={logout}>Log Out</button>
                    <BlogSection />
                </UserContext.Provider>
            </>
        )
    }

    return (
        <div style={{ fontFamily: 'system-ui' }}>
            <h1>Login to the App</h1>
            {errorMessage && <ErrorDialog message={errorMessage} />}
            <Togglable buttonLabel='Login'>
                <LoginForm loginHandler={loginUser} />
            </Togglable>
        </div>
    )
}

export default App
