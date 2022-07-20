import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const config = {
    header: { Authorization: token },
}

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const createBlog = async newBlog => {
    const response = await axios.post(baseUrl, newBlog, config)

    return response.data
}

const increaseLikes = async updatedBlog => {
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    console.log(updatedBlog.id)

    return response.data
}

export default { getAll, setToken, createBlog, increaseLikes }
