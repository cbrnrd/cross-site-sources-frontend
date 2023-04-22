import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk, logoutThunk,  } from "../thunks"
import jwt from 'jwt-decode'

const initialState = {
    isLoggedIn: false,
    jwt: null,
    role: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.jwt = action.payload.token
            state.role = jwt(action.payload.token).role
            localStorage.setItem('jwt', action.payload.token)
            console.log("Role: ", state.role)
        },
        [loginThunk.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.error = action.payload
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.jwt = action.payload.token
            state.role = jwt(action.payload.token).role
            localStorage.setItem('jwt', action.payload.token)
            console.log("Role: ", state.role)
        },
        [registerThunk.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.error = action.payload
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state = initialState
        }
    }
})

export default userSlice.reducer