import {useEffect, useState} from 'react';
import {Button, Box} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface params{
    isOpen: boolean
    name: string
    priority: string
    deadline: string
    comment: string
}

const Detail = ({isOpen, name, priority, deadline, comment}:params) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])    
    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };


    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle><h2>{name}</h2></DialogTitle>
            <DialogContent>            
                <DialogContentText>
                    <p>Priority</p>
                    <span className='basicText'>{priority}</span>
                    <p>Deadline</p>
                    <span className='basicText'>{deadline}</span>
                    <p>Comment</p>
                    <Box component='div' className='basicText' sx={{ whiteSpace: 'normal' }}>{comment}</Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color='inherit' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
export default Detail