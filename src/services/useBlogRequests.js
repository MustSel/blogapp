import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios from './useAxios'
import { fetchStart, getBlogsSuccess, getCategoriesSuccess, getUsersSuccess, likedSuccess } from '../features/blogsSlice'

const useBlogRequests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {axiosToken, axiosPublic} = useAxios()

    const getBlogs = async ()=> {
        dispatch(fetchStart())
        try {
            const res = await axiosPublic("/blogs/?limit=8&page=2")
            console.log(res)
            dispatch(getBlogsSuccess(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = async ()=> {
        dispatch(fetchStart())
        try {
            const {data:{data}} = await axiosPublic("/categories")
            console.log(data)
            const categories = data.map(item=> item.name)
            dispatch(getCategoriesSuccess(categories))
        } catch (error) {
            console.log(error)
        }
    }
    const getUsers = async ()=> {
        dispatch(fetchStart())
        try {
            const {data} = await axiosToken("/users")
            console.log(data)
            
            dispatch(getUsersSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
    const likesss = async (id)=> {
        dispatch(fetchStart())
        try {
            await axiosToken.post("/blogs/"+id+"/postLike", {})
            
            dispatch(likedSuccess())
            getBlogs()
        } catch (error) {
            console.log(error)
        }
    }




  return {getBlogs, getCategories,getUsers, likesss}
}

export default useBlogRequests