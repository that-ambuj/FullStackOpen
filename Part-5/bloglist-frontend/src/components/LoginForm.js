import React, { useState } from 'react'

const LoginForm = ({ loginHandler }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (event) => {
        event.preventDefault()

        loginHandler({ username, password })
    }

    return (
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
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm
