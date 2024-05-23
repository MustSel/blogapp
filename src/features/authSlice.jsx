import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    username:"",
    currentUserId: "",
    profilImage: "",
    email: ""
  },
  token: "",
  loading: false,
  error: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user.username = payload.user.username
      state.user.profilImage = payload.user.image
      state.user.currentUserId = payload.user._id
      state.user.email = payload.user.email
      state.token = payload.token
    },
   
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.user.username = payload.data.username
      state.user.profilImage = payload.data.image
      state.user.currentUserId = payload.data._id
      state.user.email = payload.data.email
      state.token = payload.token
      
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.user = {
        username:"",
        currentUserId: "",
        profilImage: "",
        email:""
      }
      state.token = ""
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions
export default authSlice.reducer
