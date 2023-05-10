import React from "react";
import { Card, Grid, CardContent, Typography } from "@mui/material";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import PendingUser from "./PendingUser";

const PendingRequests = ({ token, id }) => {
  const [users, setusers] = React.useState([]);

  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      if (id) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request2 = await axios.get(
          `${baseURL}api/connection/pendingReqs/${id}/`,
          header
        );
        if (!unmounted) {
          setusers(request2?.data);
        }
        return request2;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  return (
    <Card sx={{ minWidth: "100%", marginTop: "30px" }}>
      <Typography
        variant="body1"
        component="div"
        sx={{ textTransform: "capitalize", ml: "35px", mt: "35px" }}
      >
        Pending Requests
      </Typography>
      <CardContent sx={{ marginTop: "10px", marginLeft: "20px" }}>
        <Grid
          container
          spacing={{ xs: 1 }}
          rowSpacing={{ xs: 2 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {users && users?.length > 0 ? (
            users?.map((item, i) => {
              return (
                <PendingUser
                  item={item}
                  key={i}
                  id={id}
                  token={token}
                  setusers={setusers}
                />
              );
            })
          ) : (
            <Typography
              variant="h5"
              sx={{ m: "20px" }}
              gutterBottom
              component="div"
            >
              No Pending Requests
            </Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingRequests;
