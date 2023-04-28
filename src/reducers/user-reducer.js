import { createSlice } from "@reduxjs/toolkit"
import {loginThunk, registerThunk, logoutThunk, getUserThunk, isUserLoggedInThunk, likeArticleThunk, unlikeArticleThunk } from "../thunks"
import jwt_decode from 'jwt-decode'

const initialState = {
    isLoggedIn: false,
    jwt: null,
    role: null,
    error: null,
    userId: null,
    user: [],
    likedArticles: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.jwt = action.payload.token
            console.log("JWT: ", jwt_decode(action.payload.token))
            state.role = jwt_decode(action.payload.token).role
            state.userId = jwt_decode(action.payload.token).userId
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
            state.role = jwt_decode(action.payload.token).role
            state.userId = jwt_decode(action.payload.token).userId
            localStorage.setItem('jwt', action.payload.token)
            console.log("Role: ", state.role)
        },
        [registerThunk.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.error = action.payload
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state.isLoggedIn = false
            state.jwt = null
            state.role = null
            state.userId = null
            state.user = []
            localStorage.removeItem('jwt')
        },
        [getUserThunk.fulfilled]: (state, action) => {
            console.log("Fullfilled getUserThunk: ", action.payload)
            state.user = action.payload
            state.likedArticles = action.payload.likedArticles
            console.log(action.payload)
        },
        [getUserThunk.rejected]: (state, action) => {
            state.user = []
            console.log(action.payload)
        },
        [isUserLoggedInThunk.fulfilled]: (state, action) => {
            console.log("Setting isLoggedIn to: ", action)
            state.isLoggedIn = action.payload
            state.jwt = localStorage.getItem('jwt')
            state.role = jwt_decode(localStorage.getItem('jwt')).role
            state.userId = jwt_decode(localStorage.getItem('jwt')).userId
        },
        [likeArticleThunk.fulfilled]: (state, action) => {
            state.likedArticles.push(action.payload)
        },
        [unlikeArticleThunk.fulfilled]: (state, action) => {

            console.log("Unliking article: ", action.payload)
            state.likedArticles = state.likedArticles.filter(article => article._id !== action.payload)
        }
    }
})

export default userSlice.reducer