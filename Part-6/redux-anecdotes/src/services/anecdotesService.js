import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async content => {
    const newAnec = { content, votes: 0 }
    const response = await axios.post(baseUrl, newAnec)
    return response.data
}

const updateAnec = async id => {
    const toUpvote = await axios.get(`${baseUrl}/${id}`)
    const upvotedAnec = { ...toUpvote.data, votes: toUpvote.data?.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, upvotedAnec)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateAnec }
