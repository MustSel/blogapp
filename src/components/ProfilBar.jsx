import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useBlogRequests from "../services/useBlogRequests";

import { useSelector } from "react-redux";
import EditProfileModal from "./EditProfilModal";

import EditIcon from "@mui/icons-material/Edit";
import useAxios from "../services/useAxios";

const ProfileBar = ({ id }) => {
  const { getUsers } = useBlogRequests();
  const {
    userDetails: user,
    userBlogs,
    userComments,
  } = useSelector((state) => state.blogs);
  const { currentUserId } = useSelector((state) => state.auth.user);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [blogCounts, setBlogCounts] = useState(null);
  const { axiosToken } = useAxios();
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const getUserAllBlogs = async (id) => {
    try {
      const { data } = await axiosToken("/blogs/?filter[userId]=" + id);
      console.log(data);
      setBlogCounts(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers(id);
    getUserAllBlogs(id);
  }, [id, userBlogs]);

  return (
    <>
      <Box mt={2} width="70%" margin="auto">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, position: "relative" }}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: -16,
                  left: 16,
                  backgroundColor: "white",
                  px: 1,
                }}
              >
                User Details
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Avatar
                    src={user?.image}
                    alt={user?.username}
                    sx={{ width: 150, height: 150, mr: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Username:</strong> {user?.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>First Name:</strong> {user?.firstName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Last Name:</strong> {user?.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Email:</strong> {user?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>City:</strong> {user?.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Bio:</strong> {user?.bio}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="h6">Statistics</Typography>
                  <Typography variant="body1">
                    Number of Blogs: {blogCounts}
                  </Typography>
                  <Typography variant="body1">
                    Number of Comments: {userComments?.length}
                  </Typography>
                </Grid>
              </Grid>
              {currentUserId===id && (
                <IconButton
                  onClick={handleOpenEditModal}
                  sx={{ position: "absolute", top: 16, right: 16 }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <EditProfileModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        user={user}
      />
    </>
  );
};

export default ProfileBar;
