import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';


const EditProfileModal = ({ open, onClose, user, onUpdate }) => {
    const {axiosToken} = useAxios()
    // Profil bilgileri için state

    
    
    const [profileData, setProfileData] = useState({
        username: user.username,
        password: '',
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        city: user.city,
        bio: user.bio,
    });

    // Profil bilgilerindeki değişiklikleri işleme alma
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Profil bilgilerini güncelleme işlevi
    const handleUpdateProfile = async () => {
        try {
            await axiosToken.put(`/user/${user._id}`, profileData);
            onUpdate(); // Kullanıcı bilgilerinin güncellendiğini parent bileşene bildir
            onClose(); // Modalı kapat
        } catch (error) {
            console.error('Profil güncelleme hatası:', error);
            // Hata durumunda gerekli işlemler yapılabilir (örneğin, kullanıcıya bildirim gösterme)
        }
    };

    useEffect(() => {
        setProfileData({
            username: user.username,
            password: '',
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            city: user.city,
            bio: user.bio,
        })
    }, [])
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Profil Düzenleme</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="username"
                    label="Kullanıcı Adı"
                    type="text"
                    fullWidth
                    value={profileData.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={profileData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    name="firstName"
                    label="Ad"
                    type="text"
                    fullWidth
                    value={profileData.firstName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Soyad"
                    type="text"
                    fullWidth
                    value={profileData.lastName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    name="image"
                    label="Profil Fotoğrafı"
                    type="text"
                    fullWidth
                    value={profileData.image}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={handleUpdateProfile}>Güncelle</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;
