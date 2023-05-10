import React from "react";
import { Box } from "@mui/material";
import Routescomp from "./RoutesComp";
import { ThemeProvider, makeStyles } from "@mui/styles";
import theme from "./utils/theme";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: 0,
    width: "100%",
  },
}));
const Main = () => {
  const classes = useStyles();
  moment.suppressDeprecationWarnings = true;
  return (
    <Box className={classes.root}>
      <ThemeProvider theme={theme}>
        <Routescomp />
      </ThemeProvider>
    </Box>
  );
};

export default Main;
