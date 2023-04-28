import axios from "axios";
import { createAsyncThunk }
    from "@reduxjs/toolkit"
import jwt_decode from 'jwt-decode'
import { createSearchParams } from 'react-router-dom'


const BACKEND_URL = process.env.BACKEND_API || 'http://localhost:5000/api'
const LOGIN_URL = BACKEND_URL + '/auth/login'
const REGISTER_URL = BACKEND_URL + '/auth/signup'
const ARTICLE_URL = BACKEND_URL + '/articles'
const LOGOUT_URL = BACKEND_URL + '/auth/logout'
const ID_URL = BACKEND_URL + '/user/'
const CHANGE_EMAIL_URL = BACKEND_URL + '/user/changeemail'
const CHANGE_PASSWORD_URL = BACKEND_URL + '/user/changepassword'


const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Function to send credentials to the backend and set the JWT cookie
export const loginThunk = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await api.post(LOGIN_URL, credentials)
            return res.data
        } catch (err) {
            console.log("Error logging in: ", err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const registerThunk = createAsyncThunk(
    'user/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await api.post(REGISTER_URL, credentials)
            return res.data
        } catch (err) {
            console.log("Error registering: ", err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const res = await api.get(LOGOUT_URL)
            // Remote `jwt` from localStore
            localStorage.removeItem('jwt')
            return res.data
        }
        catch (err) {
            console.log("Error logging out: ", err)
            return err.response
        }
    }
)

// Thunk to get ID data without logging out
export const getUserThunk = createAsyncThunk(
    'user/user',
    async(userId, thunkAPI) => {
        try {
            const res = await api.get(ID_URL + userId)
            return res.data.user
        }
        catch (err) {
            console.log("Error fetching data: ", err)
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

// Thunk to update a user's email
export const changeEmailThunk = createAsyncThunk(
    'user/changeemail',
    async(emailArgs) => {
        try {
            const res = await api.post(CHANGE_EMAIL_URL, emailArgs)
            return res.data
        }
        catch (err) {
            console.log("Error posting data: ", err)
            return err.response
        }
    }
)

// Thunk to update a user's password
export const changePasswordThunk = createAsyncThunk(
    'user/changepassword',
    async(passwordArgs) => {
        try {
            const res = await api.post(CHANGE_PASSWORD_URL, passwordArgs)
            return res.data
        }
        catch (err) {
            console.log("Error posting data", err)
            return err.response
        }
    }
)

export const getFrontpageArticles = createAsyncThunk(
    'articles/getFrontpageArticles',
    async () => {
        try {
            const res = await api.get(ARTICLE_URL)
            return res.data.internalArticles
        } catch (err) {
            console.log("Error getting frontpage articles: ", err)
            //return err.response
        }
    }
)

export const getArticle = createAsyncThunk(
    'articles/getArticle',
    async (id) => {
        try {
            console.log("Getting article with id: ", id, " from url: ", ARTICLE_URL + '/' + id)
            const res = await api.get(ARTICLE_URL + '/' + id)
            console.log("Response from getArticle: ", res.data)
            return res.data
        } catch (err) {
            console.log("Error getting article: ", err)
            return err
        }
    }
)

export const searchArticlesThunk = createAsyncThunk(
    'search/searchArticles',
    async (searchQuery, thunkAPI) => {
        try {
            //console.log("IN THUNK: ", searchQuery)
            const response = await api.get(ARTICLE_URL + `/search?${createSearchParams({q: searchQuery})}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const postCommentThunk = createAsyncThunk(
    'comments/postComment',
    async ({comment, articleId}, thunkAPI) => {
        try {
            const response = await api.post(ARTICLE_URL + `/comment?${createSearchParams({id: articleId})}`, { text: comment })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const likeArticleThunk = createAsyncThunk(
    'articles/likeArticle',
    async (articleId, thunkAPI) => {
        try {
            const response = await api.post(ARTICLE_URL + "/like", {}, { params: { id: articleId }})
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const unlikeArticleThunk = createAsyncThunk(
    'articles/unlikeArticle',
    async (articleId, thunkAPI) => {
        try {
            await api.post(ARTICLE_URL + "/unlike", {}, { params: { id: articleId }})
            return articleId
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getLikedArticlesThunk = createAsyncThunk(
    'articles/getLikedArticles',
    async (thunkAPI) => {
        try {
            const response = await api.get(ARTICLE_URL + "/liked")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteArticleThunk = createAsyncThunk(
    'articles/deleteArticle',
    async (articleId, thunkAPI) => {
        try {
            const response = await api.delete(ARTICLE_URL + `/${articleId}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const isUserLoggedInThunk = createAsyncThunk(
    'user/isUserLoggedIn',
    async () => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            const decoded = jwt_decode(jwt)
            const currentTime = Date.now() / 1000
            if (decoded.exp < currentTime) {
                console.log("JWT expired")
                localStorage.removeItem('jwt')
                return false
            }
            return true
        }
        return false
    }
)

export const deleteCommentThunk = createAsyncThunk(
    'comments/deleteComment',
    async ({commentId}, thunkAPI) => {
        try {
            const response = await api.delete(ARTICLE_URL + `/comment/${commentId}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)