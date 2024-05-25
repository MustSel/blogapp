import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blogDetails: [],
  users: [],
  userDetails: [],
  liked: {},
  categories: [],
  pages: {},
  editMode: {
    blogId: "",
    mode: false,
    blog: {
      title: "",
      image: "",
      content: "",
      categoryId: "",
      isPublish: false,
    },
  },

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
      state.pages = payload.details.pages;
    },
    getSingleUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.userDetails = payload.data;
      
    },
   
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
    setEditMode: (state, { payload }) => {
      state.editMode = payload;
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
  setEditMode,
  getSingleUserSuccess
} = blogsSlice.actions;

export default blogsSlice.reducer;
