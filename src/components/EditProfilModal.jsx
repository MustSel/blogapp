import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';

const EditProfileModal = ({ open, onClose, user, onUpdate }) => {
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
            await axiosToken.put(`/user/${user._id}`, profileData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Profile update error:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
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
                <Button onClick={handleUpdateProfile}>Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;


