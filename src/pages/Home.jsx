import React, { useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"
import useApiRequest from "../services/useApiRequest"
import useBlogRequests from "../services/useBlogRequests"
import Card from "../components/Card"

function Home() {
  const { user } = useSelector((state) => state.auth)
  const {getBlogs, getUsers}= useBlogRequests()
  const {blogs,users} = useSelector(state=>state.blogs)
  console.log(users)
  useEffect(() => {
    getBlogs()
    getUsers()
  }, [])
  
  return (
    <>
    <Card blogs={blogs} users={users}/>
    </>
  )
}

export default Home
