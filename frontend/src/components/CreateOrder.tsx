import {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import { Input, Box, TextareaAutosize, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Select from 'react-select';

interface params{
    isOpen: boolean
    edit: boolean
    name: string
    priority: string
    deadline: Date
    comment: string
    id: number
}
interface IFormInput {
    priority: {label: string; value: string };
    name: string;
    deadline: Date;
    comment: string
  }

const CreateOrder = ({isOpen, edit, name, priority, deadline, comment, id}:params) => {
    const [open, setOpen] = useState(false);

    const [error, setError] = useState("")
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])    

    const handleClose = () => {
        setOpen(false);
        setError("");
        window.location.reload();
    };

    const { control, handleSubmit } = useForm<IFormInput>();

    const sendData: SubmitHandler<IFormInput> = data => {
        if (!data.deadline) return setError("Deadline is empty!")
        else if (!data.name) return setError("Name is empty!")
        else if (!data.priority.value) return setError("Priority is not selected!")
        else if (edit && !id) return setError("Error")

        var path = edit ? "/api/edit" : "/api/submit";
        var bodyForEdit = edit ? JSON.stringify([data, {id:id}]) : JSON.stringify(data);
        fetch(path, {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: bodyForEdit
        })
        window.location.reload();
    };
    

return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <form onSubmit={handleSubmit(sendData)}>
        <DialogTitle>{edit ? "Edit Order" : "Create Order"}</DialogTitle>
        <DialogContent>   
            <Box>
            <Controller
                name="name"
                control={control}
                defaultValue = {edit ? name : ""}
                render={({ field }) => <Input placeholder="Name" sx={{mb:2}} fullWidth={true} {...field} />}
            /></Box>         
            <Controller
                name="priority"
                control={control}
                defaultValue = { edit ? {value: priority, label: priority} : {value: '', label: 'Priority'} }
                render={({ field }) => <Select
                    {...field} 
                    options={[
                        { value: "High", label: "High" },
                        { value: "Medium", label: "Medium" },
                        { value: "Low", label: "Low" }
                    ]} 
                />}
            />
            <Box>
            <Controller
                name="deadline"
                control={control}
                // NEED FIX!
                
                defaultValue={edit ? deadline : undefined}
                render={({ field }) => <Input fullWidth={true} sx={{my:2}} type="date" {...field} />}
            /></Box>
            <Box >
            <Controller
                name="comment"
                control={control}
                defaultValue = {edit ? comment : ""}
                render={({ field }) => <TextareaAutosize minRows={6} placeholder="Comment" style={{ width: "100%" }} {...field} />}
            /></Box>
            { error && <Box sx={{ color: 'error.main' }}>{error}</Box>}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color='inherit' onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" color='inherit' type="submit">Submit</Button>
            </DialogActions>
        </form> 
      </Dialog>
    </div>
  );
}
export default CreateOrder