import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blogDetails: [],
  users: [],
  liked: {},
  categories: [],
  pages: {},

  loading: false,
  error: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload.data;
      state.pages = payload.details.pages
    },
    // getPagesSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.pages = payload;
    // },
    getBlogDetailsSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogDetails = payload.data;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    },
    getUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    likedSuccess: (state, { payload }) => {
      state.loading = false;
      state.liked = payload;
    },
  },
});

export const {
  fetchStart,
  getBlogsSuccess,
  getCategoriesSuccess,
  getUsersSuccess,
  likedSuccess,
  getBlogDetailsSuccess,
  
} = blogsSlice.actions;

export default blogsSlice.reducer;
