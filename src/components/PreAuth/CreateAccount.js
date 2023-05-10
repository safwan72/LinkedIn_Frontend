import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import axios from 'axios';
import { makeStyles } from '@mui/styles';

import { useNavigate } from 'react-router';
import { Box, Grid, Button, TextField, Container } from '@mui/material';
import baseURL from '../utils/baseurl';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: '#0177B5'
    },
    para: {
        fontSize: "40px",
        fontWeight: 'bold',
        marginRight: '5px',
    },
    para2: {
        fontSize: "30px",
        margin: '25px 0',
        color: "#0d47a1",
        textAlign: 'center'
    },
}));
const CreateAccount = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const notify = (message) => toast.dark(message, {
        onClose: () => navigate("/signin"),
        progressClassName: 'toast_error_class_progress'
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            email: "",
            password: "",
            username: "",
        }
    });

    const onSubmit = (data) => {
        const url = `${baseURL}api/auth/create/`

        axios.post(url, data)
            .then(res => {
                if (res.status === 201) {
                    notify(`Hello ${res?.data?.email}!! Login Now`);
                }
            })
            .catch(err => {
                notify("Something Went Wrong");
            })
        reset();
    };
    return (
        <Container maxWidth='lg' sx={{ mt: "50px" }}>
            <Box sx={{ py: "25px" }}>
                <div>
                    <Link to='/'>
                        <div className={classes.root}>
                            <h1 className={classes.para}>Linked</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40"><path d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z" fill="#0177b5" /><path d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z" fill="#fff" /></svg>
                        </div>
                    </Link>
                </div>
            </Box>
            <Box>
                <h3 className={classes.para2}>Create Account</h3>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container alignItems='center'>
                    <Grid item xs={12}>
                        <Grid container alignItems='center' sx={{ my: "10px" }} >
                            <Grid item xs={12} sx={{ my: "5px" }}>
                                <label id='filled-email-input'>Email</label>
                            </Grid>
                            <Grid item xs={12} sx={{ my: "5px" }} justifyContent='center'>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-email-input" variant="filled" {...field} label="Email" fullWidth />}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems='center' sx={{ my: "10px" }}>
                            <Grid item xs={12} sx={{ my: "5px" }}>
                                <label id='filled-password-input'>Password</label>
                            </Grid>
                            <Grid item xs={12} sx={{ my: "5px" }}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-password-input" variant="filled" {...field} label="Password" fullWidth />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems='center' sx={{ my: "10px" }}>
                            <Grid item xs={12} sx={{ my: "5px" }}>
                                <label id='filled-username-input'>UserName</label>
                            </Grid>
                            <Grid item xs={12} sx={{ my: "5px" }}>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => <TextField id="filled-username-input" variant="filled" {...field} label="Username" fullWidth />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ float: 'right' }}>
                    <Button type="submit" sx={{
                        backgroundColor: '#0A66C2', color: 'white',
                        boxShadow: "none",
                        minWidth: "100%",
                        marginBottom: '10px',
                        '&:hover': {
                            backgroundColor: "#0d47a1",
                        }
                    }} >
                        SignUp
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default CreateAccount