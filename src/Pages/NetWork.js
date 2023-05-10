import {
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../components/utils/baseurl";
import React from "react";
import PendingRequests from "../components/Network/Users/PendingRequests";
import Users from "../components/Network/Users/Users";
import Base from "./Base";

const NetWork = ({ token, id }) => {
  const [users, setusers] = React.useState([]);
  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(`${baseURL}api/auth/getUsers/`, header);
        if (!unmounted) {
          setusers(request?.data);
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
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ my: "20px" }}
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
                <Typography variant="body2" sx={{ ml: "20px", mb: "10px" }}>
                  Manage My Network
                </Typography>
                <Link to="/myconnections">
                  <MenuItem>
                    <ListItemIcon>
                      <PeopleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Your Connection</ListItemText>
                  </MenuItem>
                </Link>
                <MenuItem>
                  <ListItemIcon>
                    <ContactMailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Contacts</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <PeopleAltIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Groups</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Events</ListItemText>
                </MenuItem>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9}>
            <PendingRequests id={id} token={token} />
            <Card sx={{ minWidth: "100%", marginTop: "30px" }}>
              <Typography
                variant="body1"
                component="div"
                sx={{ textTransform: "capitalize", ml: "35px", mt: "35px" }}
              >
                People You May Know
              </Typography>
              <CardContent sx={{ marginTop: "10px", marginLeft: "20px" }}>
                <Grid
                  container
                  spacing={{ xs: 1 }}
                  rowSpacing={{ xs: 2 }}
                  columns={{ xs: 1, sm: 8, md: 12 }}
                >
                  {users?.map((item, i) => {
                    return <Users item={item} key={i} id={id} token={token} />;
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default NetWork;
