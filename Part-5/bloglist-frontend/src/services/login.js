import axios from 'axios'
import blogService from './blogs'
const baseUrl = '/api/login'

const login = async creds => {
    const response = await axios.post(baseUrl, creds)
    const user = await response.data

    blogService.setToken(user.token)
    return user
}

export default { login }
