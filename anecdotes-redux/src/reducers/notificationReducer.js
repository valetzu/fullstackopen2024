import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (message, timeoutInSec) => {
  return dispatch => {
    const timeoutInMs = (timeoutInSec * 1000)
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, timeoutInMs)
  }
}
export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
  
