import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.value = action.payload
        },
    },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
