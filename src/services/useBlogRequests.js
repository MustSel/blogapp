import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios from './useAxios'
import { fetchStart, getBlogsSuccess, getCategoriesSuccess } from '../features/blogsSlice'

const useBlogRequests = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {axiosToken, axiosPublic} = useAxios()

    const getBlogs = async ()=> {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic("/blogs/?limit=8&page=1")
            console.log(data)
            dispatch(getBlogsSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = async ()=> {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic("/categories")
            console.log(data)
            const categories = data.map(item=> item.name)
            dispatch(getCategoriesSuccess(categories))
        } catch (error) {
            console.log(error)
        }
    }




  return {getBlogs, getCategories}
}

export default useBlogRequests