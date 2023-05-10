import { AccordionDetails, AccordionSummary, Accordion, Box, Grid, Container, Typography } from '@mui/material'
import React from 'react'
import SignupNavbar from '../SignUp/SignupNavbar'
import { makeStyles } from '@mui/styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        padding: 0,
        width: "100%",
    },
    header: {
        color: "#B0897E",
        width: '80%',
    },
}));



const NoLoginHome = () => {
    const classes = useStyles();

    return (
        <Box>
            <SignupNavbar />
            <Container>
                <Grid container sx={{ mt: '50px' }} spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h3' className={classes.header}>Welcome to your professional community</Typography>
                        <Box sx={{ mt: '25px' }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Search for a job</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Find a person you know</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Learn a new skill</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <img src='https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4' alt='LinkedIn PreLogin Avatar' style={{ width: '100%', objectFit: 'contain' }} />
                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </Box>
    )
}

export default NoLoginHome