import React from "react";
import {
  Button,
  CardContent,
  Card,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import LoginEmailForm from "./LoginEmailForm";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    color: "#0177B5",
  },
  para: {
    fontSize: "40px",
    fontWeight: "bold",
    marginRight: "5px",
  },
}));


const LoginHome = () => {
  const classes = useStyles();
  const [formstate, setformstate] = React.useState(false);

  let showform = null;
  if (formstate) {
    showform = (
      <LoginEmailForm setmyformstate={setformstate} myformstate={formstate} />
    );
  } else {
    showform = (
      <>
        <Box>
          <Typography variant="h4" sx={{ textAlign: "center", my: "20px" }}>
            Make the most of your professional life
          </Typography>
        </Box>
        {/* #303f9f */}
        <Box sx={{ mt: "25px" }}>
          <Card sx={{ maxWidth: 500, margin: "auto", pt: "30px", pb: "30px" }}>
            <CardContent>
              <Button
                sx={{
                  backgroundColor: "#0A66C2",
                  color: "white",
                  boxShadow: "none",
                  minWidth: "100%",
                  marginBottom: "10px",
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
                onClick={() => {
                  setformstate(!formstate);
                }}
              >
                Continue with email
              </Button>

            </CardContent>
          </Card>
        </Box>
      </>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ mt: "50px" }}>
      <Box sx={{ py: "25px" }}>
        <div>
          <Link to="/">
            <div className={classes.root}>
              <h1 className={classes.para}>Linked</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="40"
                height="40"
              >
                <path
                  d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z"
                  fill="#0177b5"
                />
                <path
                  d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z"
                  fill="#fff"
                />
              </svg>
            </div>
          </Link>
        </div>
      </Box>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          {showform}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginHome;
