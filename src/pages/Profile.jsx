import { Box } from "@mui/material";
import ProfileBar from "../components/ProfilBar";
import Home from "./Home";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBlogRequests from "../services/useBlogRequests";
import { useSelector } from "react-redux";

const Profile = () => {
  const { id } = useParams();
  const [blogCounts, setBlogCounts] = useState(null)
  const { handleComments } = useBlogRequests();
  const { userComments } = useSelector((state) => state.blogs);

  console.log(userComments)
  useEffect(() => {
    handleComments(false,false,id)
  }, [id])
  
  return (
    <>
      <Box marginTop={4}>
        <ProfileBar id={id} blogCounts={blogCounts} />
      </Box>
      <Home inBlog={true} id={id} setBlogCounts={setBlogCounts} />
    </>
  );
};

export default Profile;
