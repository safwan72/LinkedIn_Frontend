import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "13px",
    "&::after": {
      content: '""',
      height: "12px",
      display: "block",
      borderBottom: "1px solid #d9d9d9",
    },
  },
}));

const SkillCard = ({ item }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Typography
        variant="body1"
        component="div"
        sx={{ textTransform: "capitalize" }}
      >
        {item?.skill?.skill}
      </Typography>
      {item?.top_skill ? (
        <DoneIcon
          sx={{
            color: "white",
            marginLeft: "10px",
            backgroundColor: "green",
            cursor: "pointer",
            width: "0.95em",
            height: "0.95em",
            padding: "5px",
            borderRadius: "50%",
          }}
        />
      ) : null}
    </Box>
  );
};

export default SkillCard;
