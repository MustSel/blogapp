import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
