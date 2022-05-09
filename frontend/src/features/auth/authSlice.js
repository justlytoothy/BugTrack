import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        exAdded(state, action) {
            state.push(action.payload)
        },
        exToggled(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
        },
        exLoading(state, action) {
            return {
                ...state,
                status: 'loading'
            }
        },
    }
})

export const { example } = authSlice.actions
export default authSlice.reducer