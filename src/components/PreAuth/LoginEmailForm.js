import React from 'react'
import { Box, Grid, Button, TextField } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import './toast.css';
import * as actions from '../../redux/actions'
import { useDispatch } from 'react-redux';
import baseURL from '../utils/baseurl';


const LoginEmailForm = ({ setmyformstate, myformstate, setMessage, message }) => {
    const dispatch = useDispatch();

    const notify = (message) => toast.dark(message, {
        progressClassName: 'toast_error_class_progress'
    });
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });



    const onSubmit = (data) => {
        let submitData = null;
        let url = null;
        submitData = {
            username: data.email,
            password: data.password,
            grant_type: 'password',
            client_id: `${process.env.REACT_APP_CLIENT_KEY}`,
            client_secret: `${process.env.REACT_APP_CLIENT_SECRET_KEY}`,
        }
        url = `${baseURL}auth/token/`
        axios.post(url, submitData)
            .then(res => {
                if (res.status === 200) {
                    notify("Succesfully Logged In!!");
                    localStorage.setItem("token", res?.data?.access_token);
                    localStorage.setItem("expires_in", new Date(Date.now() + res?.data?.expires_in * 1000))
                    dispatch(actions.authsuccess(res?.data?.access_token));
                }
            })
            .catch(err => {
                notify("Something Went Wrong");
            })
        reset();
    };
    return (
        <div>
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
                                    render={({ field }) => <TextField id="filled-password-input" variant="filled" {...field} label="Password" fullWidth type='password' />}
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
                        Login
                    </Button>
                </Box>
            </form>


        </div>
    )
}

export default (LoginEmailForm)