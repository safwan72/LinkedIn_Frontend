import * as React from 'react';
import Draggable from 'react-draggable';
import { Button, Dialog, DialogContent, Paper, TextField, DialogTitle, Box, Grid, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import baseURL from '../../utils/baseurl';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
const UploadFeaturedImage = ({ open, setopenimageModal, token, id, mydetails, setmydetails }) => {
    const [showimage, setshowimage] = React.useState(null)
    const [uploadimage, setuploadimage] = React.useState(null)
    const handleCloseImageModal = () => {
        setopenimageModal(false);
        setshowimage(null)
        setuploadimage(null)
    };
    React.useEffect(() => {
        if (mydetails) {
            setshowimage(mydetails?.picture)
        }
    }, [mydetails])
    const onSubmit = () => {
        const header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };
        let data = new FormData();
        if (uploadimage !== null) {
            data.append('picture', uploadimage)
        }
        axios.patch(`${baseURL}api/profile/userfeatured/${id}/`, data, header)
            .then(res => {
                setmydetails(res?.data);
                handleCloseImageModal();
            })
            .catch(err => {
                console.log(err);

            })
    };
    const Input = styled('input')({
        display: 'none',
    });

    return (
        <Dialog
            open={open}
            onClose={handleCloseImageModal}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            maxWidth='sm'
            fullWidth
        >
            <IconButton
                aria-label="close"
                onClick={handleCloseImageModal}
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
                Featured --- Image
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ objectFit: 'contain' }}>
                                    <img src={showimage} style={{ width: 150, height: 150, borderRadius: '50%' }} alt={mydetails?.description} />
                                </Box>
                                <label htmlFor="icon-button-file" style={{ paddingBottom: '15px' }}>
                                    <Input accept="image/png" id="icon-button-file" type="file"
                                        onChange={(event) => {
                                            setshowimage(
                                                URL.createObjectURL(event.target.files[0])
                                            );
                                            setuploadimage(event.target.files[0]);
                                        }} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Box>
                        </Grid>
                        {uploadimage ? (
                            <Grid item xs={12} >
                                <Button variant="contained" sx={{
                                    backgroundColor: '#0d47a1', color: 'white',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: "#0A66C2",
                                    }

                                }}
                                    onClick={onSubmit}
                                >
                                    Save
                                </Button>
                            </Grid>

                        ) : null}
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    )
}


export default UploadFeaturedImage