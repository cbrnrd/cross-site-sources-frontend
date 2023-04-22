import { createSlice } from "@reduxjs/toolkit"
import {loginThunk, registerThunk, logoutThunk, getUserThunk,} from "../thunks"
import jwt from 'jwt-decode'

const initialState = {
    isLoggedIn: false,
    jwt: null,
    role: null,
    error: null,
    userId: null,
    user: []
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
            state.userId = jwt(action.payload.token).userId
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
            state.userId = jwt(action.payload.token).userId
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
        },
        [getUserThunk.fulfilled]: (state, action) => {
            state.user = action.payload
            console.log(action.payload)
        }
    }
})

export default userSlice.reducer