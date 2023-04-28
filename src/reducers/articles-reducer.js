import { createSlice } from "@reduxjs/toolkit"
import { getFrontpageArticles, getArticle, postCommentThunk, deleteArticleThunk, deleteCommentThunk, getLikedArticlesThunk } from "../thunks"

const initialState = {
    articles: [],
    likedArticles: [],
    // store a single article for viewing
    article: {},
    article2: {},
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
            state.article = action.payload
            state.article2 = action.payload
        },
        [getArticle.rejected]: (state, action) => {
            state.loading = false
        },
        [postCommentThunk.fulfilled]: (state, action) => {
            state.article.comments.push(action.payload)
        },
        [deleteArticleThunk.fulfilled]: (state, action) => {
            state.articles = state.articles.filter(article => article.id !== action.payload)
        },
        [deleteCommentThunk.fulfilled]: (state, action) => {
            if (state.article) {
                state.article.comments = state.article.comments.filter(comment => comment.id !== action.payload)
            }
        },
        [getLikedArticlesThunk.pending]: (state, action) => {
            state.loading = true
        },
        [getLikedArticlesThunk.fulfilled]: (state, action) => {
            state.likedArticles = action.payload
            state.loading = false
        }
    }
})

export default articlesSlice.reducer
