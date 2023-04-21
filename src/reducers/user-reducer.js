import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, registerThunk, logoutThunk } from "../thunks"

const initialState = {
    isLoggedIn: false,
    jwt: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.jwt = action.payload
        },
        [loginThunk.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.error = action.payload
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.jwt = action.payload
        },
        [registerThunk.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.error = action.payload
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
        }
    }
})

export default userSlice.reducer