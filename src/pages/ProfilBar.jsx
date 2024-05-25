import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useBlogRequests from "../services/useBlogRequests";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileModal from "../components/EditProfilModal";

const ProfilBar = () => {
    const { id } = useParams();
    const { getUsers } = useBlogRequests();
    const { userDetails: user } = useSelector((state) => state.blogs);
    // Profil bilgilerini düzenleme modalı için state
    const [openEditModal, setOpenEditModal] = useState(false);
  
    // Profil bilgilerini düzenleme modalını açma işlevi
    const handleOpenEditModal = () => {
      setOpenEditModal(true);
    };
    
    // Profil bilgilerini düzenleme modalını kapatma işlevi
    const handleCloseEditModal = () => {
      setOpenEditModal(false);
    };
  
    useEffect(() => {
      getUsers(id);
    }, []);
  
    return (
      <>
        <Box mt={4} width="80%" margin="auto">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Avatar
                src={user?.image}
                alt={user?.username}
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" align="center">Kullanıcı Bilgileri</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Kullanıcı Adı: {user?.username}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Ad: {user?.firstName}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Soyad: {user?.lastName}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Email: {user?.email}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Şehir: {user?.city}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1 }}>
                      <Typography variant="body1">Biyografi: {user?.bio}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5">İstatistikler</Typography>
              <Typography variant="body1">Oluşturulan Blog Sayısı: {user?.blogs?.length}</Typography>
              <Typography variant="body1">Yapılan Yorum Sayısı: {user?.comments?.length}</Typography>
            </Paper>
          </Grid>
          </Grid>
        </Box>
        {/* Profil düzenleme modalı */}
        <EditProfileModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          user={user}
        />
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleOpenEditModal} variant="contained">
            Profili Düzenle
          </Button>
        </Box>
      </>
    );
  };
  
  export default ProfilBar;
