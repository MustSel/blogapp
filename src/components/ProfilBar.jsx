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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileModal from "./EditProfilModal";
import BlogCard from "./BlogCard";
import EditIcon from "@mui/icons-material/Edit";

const ProfileBar = ({id}) => {
  
  const { getUsers } = useBlogRequests();
  const { userDetails: user } = useSelector((state) => state.blogs);
  const { blogs } = user || {};
  const isCurrentUser = true; // Bu değişkenin gerçek değeri redux veya başka bir state'den alınabilir

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
console.log(user)
  useEffect(() => {
    getUsers(id);
  }, [id]);

  return (
    <>
      <Box mt={4} width="80%" margin="auto">
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
                    Number of Blogs: {user?.blogs?.length}
                  </Typography>
                  <Typography variant="body1">
                    Number of Comments: {user?.comments?.length}
                  </Typography>
                </Grid>
              </Grid>
              {isCurrentUser && (
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
