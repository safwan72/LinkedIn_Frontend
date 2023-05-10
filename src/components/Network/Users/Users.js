import React from "react";
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";
import RenderImage from "../../utils/RenderImage";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import { Link } from "react-router-dom";
const Users = ({ item, id, token }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [work, setwork] = React.useState([]);
  const [connected, setconnected] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setmyprofile_pic(item?.profile_pic);
        setmycover_pic(item?.cover_pic);
        setwork(item?.work && item?.work[0]);
      }
    }
    fetchData();
  }, [item]);

  React.useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      if (item) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.get(
          `${baseURL}api/connection/check_connection/${id}/${item?.user?.id}/`,
          header
        );
        if (!unmounted) {
          setconnected(request?.data);
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, id, token]);

  const handleFollowUser = () => {
    async function fetchData() {
      if (item) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/send_connection/`,
          {
            sender: id,
            receiver: item?.user?.id,
          },
          header
        );
        setconnected(request?.data);
      }
    }
    return fetchData();
  };
  const handleRemoveUser = () => {
    async function fetchData() {
      if (item) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/send_connection/`,
          {
            sender: id,
            receiver: item?.user?.id,
          },
          header
        );
        setconnected(request?.data);
      }
    }
    return fetchData();
  };
  // const handleCancelUser = () => {
  //   async function fetchData() {
  //     if (item) {
  //       const header = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const request = await axios.post(
  //         `${baseURL}api/connection/cancelfollowrequest/`,
  //         {
  //           sender: id,
  //           receiver: item?.user?.id,
  //         },
  //         header
  //       );
  //       setconnected(request?.data);
  //     }
  //   }
  //   return fetchData();
  // };
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      component={Link}
      to={`/profile-selector/${item?.user?.id}/`}
    >
      <Card
        sx={{
          maxWidth: 400,
          position: "relative",
          margin: "auto",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="60"
          image={mycover_pic}
          alt="green iguana"
          sx={{ objectFit: "cover", marginBottom: "12px" }}
        />
        <RenderImage
          src={myprofile_pic}
          alt="My Pic"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: 20,
            left: "50%",
            transform: " translateX(-50%)",
            borderRadius: "50%",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            {item?.user?.email}
          </Typography>
          {item?.work && item?.work?.length > 0 ? (
            <Box
              color="text.secondary"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.68rem",
                pt: "5px",
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ fontWeight: 600, textAlign: "center", width: "100%" }}
              >
                {work?.title} at {work?.company}
              </Typography>
            </Box>
          ) : null}

          <Box
            sx={{
              fontSize: "0.68rem",
              pt: "5px",
              mt: "10px",
              textAlign: "center",
            }}
          >
            {connected === "not connected" && (
              <Button
                variant="outlined"
                sx={{ margin: "auto" }}
                size="small"
                onClick={() => handleFollowUser()}
              >
                Connect
              </Button>
            )}
            {connected === "Sender pending" && (
              <Button
                variant="outlined"
                sx={{ margin: "auto" }}
                size="small"
                onClick={() => handleRemoveUser()}
              >
                Cancel
              </Button>
            )}
            {connected === "Receiver pending" && (
              <Button
                variant="outlined"
                sx={{ margin: "auto" }}
                size="small"
                // onClick={() => handleCancelUser()}
              >
                Accept
              </Button>
            )}
            {/* {!connected ? (
            ) : (
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                Connected
              </Typography>
            )} */}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Users;
