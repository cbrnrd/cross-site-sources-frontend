import axios from "axios";
import { createAsyncThunk }
    from "@reduxjs/toolkit"

const BACKEND_URL = process.env.BACKEND_API || 'http://localhost:5000/api'
const LOGIN_URL = BACKEND_URL + '/auth/login'
const REGISTER_URL = BACKEND_URL + '/auth/signup'
const ARTICLE_URL = BACKEND_URL + '/articles'
const LOGOUT_URL = BACKEND_URL + '/auth/logout'


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
    async (credentials) => {
        try {
            const res = await api.post(LOGIN_URL, credentials)
            return res.data
        } catch (err) {
            console.log("Error logging in: ", err)
            return err.response
        }
    }
)

export const registerThunk = createAsyncThunk(
    'user/register',
    async (credentials,  { rejectWithValue }) => {
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
            return res.data
        }
        catch (err) {
            console.log("Error logging out: ", err)
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
            const res = await api.get(ARTICLE_URL + '/' + id)
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
            console.log("IN THUNK: ", searchQuery)
            const response = await api.get(ARTICLE_URL + '/search', { params: { q: searchQuery } })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
