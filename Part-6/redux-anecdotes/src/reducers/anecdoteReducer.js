import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        upvoteAnec(state, action) {
            const id = action.payload
            const toUpvote = state.find(anec => anec.id === id)
            const upvotedAnec = { ...toUpvote, votes: toUpvote.votes + 1 }
            return state.map(anec => (anec.id !== id ? anec : upvotedAnec))
        },
        createAnec(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    },
})

export const { upvoteAnec, createAnec, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
