import { Box, Typography } from '@mui/material'
import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex', flexDirection: 'column',
        paddingBottom: '13px',
        "&::after": {
            content: '""',
            height: '12px',
            display: "block",
            borderBottom: '1px solid #d9d9d9'
        }
    }
}));

function getDate(givendate) {
    if (givendate) {
        const mydate = new Date(givendate)
        const year = mydate?.getFullYear();
        const month = mydate?.toLocaleString("default", { month: "long" });
        return year + "  " + month
    }
    else if (givendate === null) {
        return "Now"
    }
}

const ExperienceCard = ({ item }) => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Typography variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
                {item?.title}
            </Typography>
            <Typography variant="subtitle2" component="div">
                {item?.company} | {item?.employment_type}
            </Typography>
            <Typography variant="body2" component="div" sx={{ textTransform: 'capitalize' }}>
                {getDate(item?.start_date)}  -  {getDate(item?.end_date)}
            </Typography>
            <Typography variant="caption" component="div" sx={{ mt: '10px' }}>
                {item?.description}
            </Typography>
        </Box>
    )
}

export default ExperienceCard