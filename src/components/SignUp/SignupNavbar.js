import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Logo from '../utils/Logo';
import { Link } from 'react-router-dom';
const SignupNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Container maxWidth='lg' sx={{ py: "5px" }}>
                    <Toolbar sx={{ paddingLeft: "0 !important" }}>
                        <Link to='/'>
                            <Logo />
                        </Link>
                        <Box component="div" sx={{ flexGrow: 1 }} />
                        <Link to='/signup'>

                            <Button variant="contained" sx={{
                                color: "gray",
                                backgroundColor: "transparent",
                                marginRight: "3px",
                                boxShadow: "none",
                                '&:hover': {
                                    backgroundColor: "gray",
                                    color: "black",
                                },
                            }}>Join Now</Button>
                        </Link>
                        <Link to='/signin'>

                            <Button variant="contained" sx={{
                                backgroundColor: "transparent",
                                color: "#0177B5",
                                boxShadow: "none",
                                border: "1px solid #0177B5",
                                borderRadius: "10px",
                                transition: 'all 200ms ease-in-out',
                                '&:hover': {
                                    backgroundColor: "#0177B5",
                                    color: "white",
                                },
                            }}>Sign In</Button>
                        </Link>

                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default SignupNavbar;




