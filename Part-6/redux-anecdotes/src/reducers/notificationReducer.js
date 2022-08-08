import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeNotification(state, action) {
            return action.payload
        },
    },
})

export const setNotification = (content, timing) => {
    return async dispatch => {
        await dispatch(changeNotification(content))
        setTimeout(async () => {
            await dispatch(changeNotification(''))
        }, timing * 1000)
    }
}

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer
