import React, { useEffect } from "react";
import ProfileBar from "../components/ProfilBar";
import Home from "./Home";
import { useSelector } from "react-redux";
import useBlogRequests from "../services/useBlogRequests";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    const {allBlogs} = useSelector(state=>state.blogs)
    const {getAllBlogs} = useBlogRequests()

    // useEffect(() => {
    //     getAllBlogs()
    // }, [])
    console.log(allBlogs)

  return (
    <>
      <ProfileBar id={id} />
      <Home inBlog = {true} id={id} />
    </>
  );
};

export default Profile;
