import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [],
    categories: [],
  loading: false,
  error: false,
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchStart: (state) => {
        state.loading = true
        state.error = false
      },
      getBlogsSuccess: (state, { payload }) => {
        state.loading = false
        state.blogs = payload.data
        
      },
      getCategoriesSuccess: (state, { payload }) => {
        state.loading = false
        state.categories = payload
        
      },
  }
});

export const {fetchStart, getBlogsSuccess,getCategoriesSuccess} = blogsSlice.actions

export default blogsSlice.reducer