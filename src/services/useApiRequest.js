import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxios from "./useAxios"



const useApiRequest = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { axiosToken, axiosPublic } = useAxios()
  
  const login = async (userData) => {
   
    dispatch(fetchStart())
    try {
     
      const { data } = await axiosPublic.post("/auth/login/", userData)
      dispatch(loginSuccess(data))
      console.log(data)
      toastSuccessNotify("Login işlemi başarılı")
      navigate(-1)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login başarısız oldu")
      console.log(error)
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data))
      toastSuccessNotify("Kayıt başarılı")
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Kayıt başarısız oldu")
      console.log(error)
    }
  }
  
  const logout = async () => {
    dispatch(fetchStart())
    try {
     
      await axiosToken.get("/auth/logout")
      toastSuccessNotify("Logout başarılı")
      dispatch(logoutSuccess())
    } catch (error) {
      toastErrorNotify("Logout başarısız oldu")
      dispatch(fetchFail())
    }
  }

  return { login, register, logout }
}

export default useApiRequest
