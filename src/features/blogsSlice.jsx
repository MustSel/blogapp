import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [],
    users:[],
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
      getUsersSuccess: (state, { payload }) => {
        state.loading = false
        state.users = payload.data
        
      },
      likedSuccess: (state) => {
        state.loading = false
        
        
      },
  }
});

export const {fetchStart, getBlogsSuccess,getCategoriesSuccess,getUsersSuccess, likedSuccess} = blogsSlice.actions

export default blogsSlice.reducer