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

function Home() {
  const { user } = useSelector((state) => state.auth)
  const {getBlogs}= useBlogRequests()
  const {blogs} = useSelector(state=>state.blogs)
  console.log(blogs)
  useEffect(() => {
    getBlogs()
  }, [])
  
  return (
    <>
    
    </>
  )
}

export default Home
