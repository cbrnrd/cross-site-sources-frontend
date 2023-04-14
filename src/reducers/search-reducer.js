import { createSlice } from "@reduxjs/toolkit"
import { searchArticlesThunk } from "../thunks"

const initialState = {
    articles: null,
    loading: false,
    error: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchArticlesThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchArticlesThunk.fulfilled, (state, action) => {
                state.loading = false
                state.articles = action.payload
            })
            .addCase(searchArticlesThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default searchSlice.reducer
