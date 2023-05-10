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

const PendingUser = ({ item, id, token, setusers }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [work, setwork] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      if (item?.sender) {
        setmyprofile_pic(item?.sender?.profile_pic);
        setmycover_pic(item?.sender?.cover_pic);
        setwork(item?.sender?.work && item?.sender?.work[0]);
      }
    }
    fetchData();
  }, [item]);
  const acceptUser = () => {
    async function fetchData() {
      if (item) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/accept_connection/`,
          {
            sender: item?.sender?.user?.id,
            receiver: id,
          },
          header
        );
        setusers(request?.data);
      }
    }
    return fetchData();
  };
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card
        sx={{ maxWidth: 400, position: "relative", margin: "auto" }}
        // component={Link}
        // to={`/profile-selector/${post?.author?.user?.id}/`}
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
            {item?.sender?.user?.email}
          </Typography>
          {item?.sender?.work && item?.sender?.work?.length > 0 ? (
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
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                {work?.title} at {work?.company}
              </Typography>
            </Box>
          ) : null}
          <Box fullWidth sx={{ textAlign: "center", mt: "20px" }}>
            <Button
              variant="outlined"
              sx={{ margin: "auto" }}
              onClick={() => acceptUser()}
            >
              Accept
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PendingUser;
