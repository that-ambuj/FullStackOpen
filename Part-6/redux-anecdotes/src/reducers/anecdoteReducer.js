import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        updateAnec(state, action) {
            return state.map(anec =>
                anec.id !== action.payload.id ? anec : action.payload
            )
        },
        addAnec(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    },
})

export const initializeAnecs = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnec = content => {
    return async dispatch => {
        const newAnec = await anecdotesService.createNew(content)
        dispatch(addAnec(newAnec))
    }
}

export const upvoteAnec = id => {
    return async dispatch => {
        const updatedAnec = await anecdotesService.updateAnec(id)
        dispatch(updateAnec(updatedAnec))
    }
}

export const { updateAnec, addAnec, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
