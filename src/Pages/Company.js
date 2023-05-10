import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import baseURL from "../components/utils/baseurl";
import Footer from "../components/utils/Footer/Footer";
import Base from "./Base";
import JobSingle from "../components/Company/CompanyPosts/JobSingle";

const Company = ({ token, id }) => {
  const [organizations, setorganizations] = React.useState([]);
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      if (id) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.get(
          `${baseURL}api/organizations/recentJobs/`,
          header
        );
        if (!unmounted) {
          setorganizations(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  return (
    <Base>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid
          container
          // sx={{ my: "20px" }}
          columnSpacing={{ sm: 3 }}
          rowSpacing={1}
        >
          <Grid item xs={12} sm={3}>
            <Card sx={{ marginTop: "30px", py: "20px" }}>
              <Box
                color="text.secondary"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="/saved-jobs">
                  <MenuItem>
                    <ListItemIcon>
                      <BookmarkAddedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ whiteSpace: "pre-line" }}>
                      My Jobs
                    </ListItemText>
                  </MenuItem>
                </Link>
                <Link to="/pages">
                  <MenuItem>
                    <ListItemIcon>
                      <BusinessIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ whiteSpace: "pre-line" }}>
                      Visit all Companies
                    </ListItemText>
                  </MenuItem>
                </Link>
                <Link to="/profile">
                  <MenuItem>
                    <ListItemIcon>
                      <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ whiteSpace: "pre-line" }}>
                      Profile
                    </ListItemText>
                  </MenuItem>
                </Link>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Card sx={{ minWidth: "100%", marginTop: "30px" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ textTransform: "capitalize", ml: "35px", mt: "20px" }}
              >
                Recent Jobs
              </Typography>
              <CardContent sx={{ marginTop: "10px", marginLeft: "20px" }}>
                <Grid
                  container
                  spacing={{ xs: 1 }}
                  rowSpacing={{ xs: 2 }}
                  columns={{ xs: 1, sm: 8, md: 12 }}
                >
                  {organizations && organizations?.length > 0 ? (
                    organizations?.map((item, i) => {
                      return <JobSingle item={item} key={i} />;
                    })
                  ) : (
                    <Typography variant="body1" sx={{ mt: "15px", ml: "10px" }}>
                      No recent Job openings!!!
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "50px" }}>
          <Grid item xs={12}>
            <Box sx={{ mt: "25px" }}>
              <Footer />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default Company;
