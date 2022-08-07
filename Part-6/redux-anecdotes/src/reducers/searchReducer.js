import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const searchSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        },
    },
})

export const { setFilter } = searchSlice.actions
export default searchSlice.reducer
