import * as React from 'react';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogContent, Paper, TextField, DialogTitle, Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import baseURL from '../../utils/baseurl';
import { useForm, Controller } from "react-hook-form";

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
const EditFeatured = ({ open, handleClose, token, id, mydetails, setmydetails }) => {
    const { handleSubmit, control, reset } = useForm(
        {
            defaultValues: {
                description: mydetails ? mydetails?.description : "",
                title: mydetails ? mydetails?.title : "",
                link: mydetails ? mydetails?.link : "",
            }
        }
    );
    React.useEffect(() => {
        if (mydetails) {
            reset({
                description: mydetails?.description,
                title: mydetails?.title,
                link: mydetails?.link
            });
        }
    }, [mydetails, reset])

    const onSubmit = (data) => {
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        axios.patch(`${baseURL}api/profile/userfeatured/${id}/`, data, header)
            .then(res => {
                if (res.status === 200) {
                    setmydetails(res?.data);
                }
                reset();
                handleClose();
            })
            .catch(err => {
                console.log(err);
                reset();

            })
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            maxWidth='sm'
            fullWidth
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogTitle style={{ cursor: 'move' }} sx={{ my: '10px' }} id="draggable-dialog-title">
                Featured
            </DialogTitle>
            <DialogContent>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-title-input" placeholder='Title' variant="standard"  {...field} fullWidth sx={{ mb: '20px' }} />}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-description-input" variant="standard" placeholder='Description'  {...field} fullWidth sx={{ mb: '20px' }} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                <Controller
                                    name="link"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-link-input" variant="standard" {...field} placeholder='Link' fullWidth sx={{ mb: '20px' }} />}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ float: 'right' }}>
                            <Button type="submit" sx={{
                                backgroundColor: '#0A66C2', color: 'white',
                                marginTop: '20px',
                                minWidth: "90px",
                                padding: "13px 12px",
                                borderRadius: "15px",
                                '&:hover': {
                                    backgroundColor: "#0d47a1",
                                }
                            }} >
                                Edit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditFeatured