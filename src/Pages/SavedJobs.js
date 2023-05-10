import React from "react";
import Base from "./Base";
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Box,
  Button,
  Container,
  Grid,
  Fab,
} from "@mui/material";
import axios from "axios";
import Footer from "../components/utils/Footer/Footer";
import baseURL from "../components/utils/baseurl";
import MySavedJobs from "../components/Jobs/SavedJobs";

const SavedJobs = ({ id, token }) => {
  const [mysaved, setmysaved] = React.useState([]);

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
        const request = await axios.get(
          `${baseURL}api/organizations/getSavedJobs/${id}/`,
          header
        );
        if (!unmounted) {
          setmysaved(request?.data);
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
        <Grid container spacing={4} sx={{ mt: "30px" }}>
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={{ xs: 1 }}
                  rowSpacing={{ xs: 2 }}
                  columns={{ xs: 1, sm: 8, md: 12 }}
                  sx={{ mt: "40px" }}
                >
                  {mysaved &&
                    mysaved?.map((item, i) => {
                      return (
                        <MySavedJobs
                          item={item}
                          key={i}
                          id={id}
                          token={token}
                        />
                      );
                    })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12} sm={3}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default SavedJobs;
