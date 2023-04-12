import { createSlice } from "@reduxjs/toolkit"
import { getFrontpageArticles, getArticle, searchArticlesThunk } from "../thunks"

const initialState = {
    articles: [],
    searchArticles: [],
    loading: false
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: {
        [getFrontpageArticles.pending]: (state, action) => {
            state.loading = true
        },
        [getFrontpageArticles.fulfilled]: (state, action) => {
            state.loading = false
            state.articles = action.payload
        },
        [getFrontpageArticles.rejected]: (state, action) => {
            state.loading = false
        },
        [getArticle.pending]: (state, action) => {
            state.loading = true
        },
        [getArticle.fulfilled]: (state, action) => {
            state.loading = false
            state.articles = action.payload
        },
        [getArticle.rejected]: (state, action) => {
            state.loading = false
        },
        [searchArticlesThunk.pending]: (state, action) => {
            state.loading = true
        },
        [searchArticlesThunk.fulfilled]: (state, action) => {
            state.loading = false
            state.searchArticles = action.payload
        },
        [searchArticlesThunk.rejected]: (state, action) => {
            state.loading = false
        }

    }
})

export default articlesSlice.reducer