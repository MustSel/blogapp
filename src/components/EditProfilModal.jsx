import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import ConfirmationDialog from './ConfirmationDialog';

const EditProfileModal = ({ open, onClose, user, setOnUpdate, onUpdate }) => {
    const { axiosToken } = useAxios();

    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        password: '',
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        image: user?.image || '',
        city: user?.city || '',
        bio: user?.bio || '',
    });

    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username,
                password: '',
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                city: user.city,
                bio: user.bio,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            await axiosToken.put(`/users/${user._id}`, profileData);
            setOnUpdate(!onUpdate);
            onClose();
            toastSuccessNotify("Profil Başarıyla Düzenlendi.");
        } catch (error) {
            console.error('Profile update error:', error);
            toastErrorNotify("Profil Düzenleme Başarısız.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        setConfirmOpen(false);
        handleUpdateProfile();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={profileData.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={profileData.password}
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
                            label="First Name"
                            type="text"
                            fullWidth
                            value={profileData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={profileData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="image"
                            label="Profile Image"
                            type="text"
                            fullWidth
                            value={profileData.image}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            value={profileData.city}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="bio"
                            label="Bio"
                            type="text"
                            fullWidth
                            value={profileData.bio}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">Update</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ConfirmationDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirm}
                message="Değişiklikler kaydedilecektir. Onaylıyor musunuz?"
            />
        </>
    );
};

export default EditProfileModal;
