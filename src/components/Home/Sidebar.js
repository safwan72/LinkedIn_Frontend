import React from "react";
import { Typography, CardMedia, Card, CardContent, Box } from "@mui/material";
import RenderImage from "../utils/RenderImage";
import axios from "axios";
import baseURL from "../utils/baseurl";

const Sidebar = ({ details, id, token }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [profileViews, setprofileViews] = React.useState(0);
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      if (id) {
        const request = await axios.get(
          `${baseURL}api/auth/profileViews/${id}/`,
          header
        );
        if (!unmounted) {
          setprofileViews(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  React.useEffect(() => {
    async function fetchData() {
      if (details) {
        setmyprofile_pic(details?.profile_pic);
        setmycover_pic(details?.cover_pic);
      }
    }
    fetchData();
  }, [details]);

  return (
    <Card sx={{ maxWidth: 400, position: "relative" }}>
      <CardMedia
        component="img"
        height="60"
        image={mycover_pic}
        alt={details?.user?.username}
        sx={{ objectFit: "cover", marginBottom: "12px" }}
      />
      <RenderImage
        src={myprofile_pic}
        alt={details?.user?.username}
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
          variant="h5"
          component="div"
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {details?.user?.username}
        </Typography>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {details?.user?.email}
        </Typography>
        <Box
          color="text.secondary"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            fontSize: "0.68rem",
            pt: "5px",
          }}
        >
          <p>Profile Views</p>
          <p>{profileViews}</p>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
