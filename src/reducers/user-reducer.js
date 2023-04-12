import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk } from "../thunks"

const initialState = {
    isLoggedIn: false,
    jwt: null,
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
        [logoutThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
        }
    }
})

export default userSlice.reducer