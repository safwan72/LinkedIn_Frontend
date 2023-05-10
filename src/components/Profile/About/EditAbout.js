import * as React from 'react';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogContent, Paper, TextField, DialogTitle, Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import baseURL from '../../utils/baseurl';


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
const EditAbout = ({ open, handleClose, token, id, data }) => {
    const [myinput, setmyinput] = React.useState("");
    const onSubmit = () => {
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        axios.patch(`${baseURL}api/profile/userabout/${id}/`, {
            'description': myinput
        }, header)
            .then(res => {
                if (res.status === 200) {
                    data(res?.data);
                }
                setmyinput("");
                handleClose();
            })
            .catch(err => {
                console.log(err);
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
                About
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Grid container alignItems='center'>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                id="filled-description-input"
                                rows={10}
                                fullWidth
                                placeholder="Edit About Info"
                                value={myinput}
                                onChange={(e) => {
                                    setmyinput(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ float: 'right' }}>
                        <Button type="button" sx={{
                            backgroundColor: '#0A66C2', color: 'white',
                            marginTop: '20px',
                            minWidth: "90px",
                            padding: "13px 12px",
                            borderRadius: "15px",
                            '&:hover': {
                                backgroundColor: "#0d47a1",
                            }
                        }} onClick={onSubmit}>
                            Edit
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditAbout