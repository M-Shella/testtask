import {useEffect, useState} from 'react';
import {Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
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
            <DialogTitle sx={{fontWeight: 'bold', fontSize:'35px'}}>{name}</DialogTitle>
            <DialogContent>            
                <DialogContentText>
                    Priority
                </DialogContentText>
                    <Box component='span' className='basicText'>{priority}</Box>
                    <DialogContentText>Deadline</DialogContentText>
                    <Box component='span' className='basicText'>{deadline}</Box>
                    <DialogContentText>Comment</DialogContentText>
                    <Box component='div' className='basicText' sx={{ whiteSpace: 'normal' }}>{comment}</Box>
                
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color='inherit' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
export default Detail