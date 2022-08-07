import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

const searchSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.value = action.payload
        },
    },
})

export const { setFilter } = searchSlice.actions
export default searchSlice.reducer
