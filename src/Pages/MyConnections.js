import { Container, Grid, Card, Typography } from "@mui/material";
import React from "react";
import Base from "./Base";
import axios from "axios";
import baseURL from "../components/utils/baseurl";
import MyConnectionSingle from "../components/Network/MyConnectionSingle";
import Footer from "../components/utils/Footer/Footer";

const MyConnections = ({ token, id }) => {
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
        const request = await axios.post(
          `${baseURL}api/connection/getMyConnections/`,
          {
            sender: id,
          },
          header
        );
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          sx={{ mt: "35px" }}
          columnSpacing={{ sm: 3 }}
          rowSpacing={1}
        >
          <Grid item xs={12} sm={9}>
            <Card>
              <Typography variant="h6" sx={{ ml: "30px", my: "20px" }}>
                My Connections
              </Typography>
              {users && users?.length > 0 ? (
                users?.map((item, i) => {
                  return <MyConnectionSingle item={item} key={i} id={id} />;
                })
              ) : (
                <Typography variant="body2" sx={{ ml: "30px", my: "20px" }}>
                  No Conections Yet
                </Typography>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default MyConnections;
