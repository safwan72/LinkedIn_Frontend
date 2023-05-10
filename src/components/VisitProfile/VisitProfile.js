import axios from "axios";
import React from "react";
import baseURL from "../utils/baseurl";
import { useParams } from "react-router-dom";
import Base from "../../Pages/Base";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import RenderImage from "../utils/RenderImage";
import VisitFeatured from "./VisitFeatured";
import VisitEducation from "./VisitEducation";
import VisitWork from "./VisitWork";

const VisitProfile = ({ token, myid }) => {
  const urlParams = useParams();
  const [userID, setuserID] = React.useState(null);
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [myheadline, setmyheadline] = React.useState([]);
  const [mywork, setmywork] = React.useState([]);
  const [myabout, setmyabout] = React.useState([]);
  const [myfeatured, setmyfeatured] = React.useState([]);
  const [myeducation, setmyeducation] = React.useState([]);
  const [connected, setconnected] = React.useState(false);
  const [userIDdetails, setuserIDdetails] = React.useState([]);

  React.useEffect(() => {
    setuserID(urlParams?.id);
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (userID) {
        const request = await axios.get(
          `${baseURL}api/profile/getUserByID/${userID}/`,
          header
        );
        await axios.post(
          `${baseURL}api/auth/viewprofile/`,
          {
            myProfile: userID,
            viewer: myid,
          },
          header
        );
        if (request.status === 200) {
          if (!unmounted) {
            setuserIDdetails(request?.data);
            // setmycontactInfo(request?.data?.contacts);
            setmyheadline(request?.data?.headline);
            setmywork(request?.data?.work);
            setmyabout(request?.data?.about);
            setmyfeatured(request?.data?.featured);
            setmyeducation(request?.data?.education);
            setmyprofile_pic(request?.data?.profile_pic);
            setmycover_pic(request?.data?.cover_pic);
          }
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [token, urlParams?.id, userID, myid]);
  React.useEffect(() => {
    async function fetchData() {
      if (myid && userID) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.get(
          `${baseURL}api/connection/check_connection/${myid}/${userID}/`,
          header
        );
        console.log(request);
        setconnected(request?.data);
      }
    }
    fetchData();
  }, [userID, myid, token]);
  const handleFollowUser = () => {
    async function fetchData() {
      if (myid && userID) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/send_connection/`,
          {
            sender: myid,
            receiver: userID,
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
      if (myid && userID) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/send_connection/`,
          {
            sender: myid,
            receiver: userID,
          },
          header
        );
        setconnected(request?.data);
      }
    }
    return fetchData();
  };
  const handleAcceptUserRequest = () => {
    async function fetchData() {
      if (myid && userID) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/accept_connection/`,
          {
            sender: userID,
            receiver: myid,
          },
          header
        );
        if (request?.status === 200) {
          setconnected("accepted");
        } else {
          setconnected("not connected");
        }
      }
    }
    return fetchData();
  };
  const handleCancelUser = () => {
    async function fetchData() {
      if (myid && userID) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.post(
          `${baseURL}api/connection/cancelfollowrequest/`,
          {
            sender: myid,
            receiver: userID,
          },
          header
        );
        setconnected(request?.data);
      }
    }
    return fetchData();
  };
  return (
    <Base>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 250, position: "relative" }}>
              <CardMedia
                component="img"
                height="130"
                image={mycover_pic}
                alt="green iguana"
                sx={{ objectFit: "cover", marginBottom: "12px" }}
              />
              <RenderImage
                src={myprofile_pic}
                alt="My Pic"
                style={{
                  width: "100px",
                  height: "100px",
                  position: "absolute",
                  top: 60,
                  left: "50%",
                  transform: " translateX(-50%)",
                  borderRadius: "50%",
                }}
              />
              <CardContent>
                {connected === "not connected" && (
                  <Button
                    variant="outlined"
                    sx={{ margin: "auto", float: "right" }}
                    size="small"
                    onClick={() => handleFollowUser()}
                  >
                    Connect
                  </Button>
                )}
                {connected === "accepted" && (
                  <Button
                    variant="outlined"
                    sx={{ margin: "auto", float: "right" }}
                    size="small"
                    onClick={() => handleRemoveUser()}
                  >
                    Remove
                  </Button>
                )}
                {connected === "Sender pending" && (
                  <Button
                    variant="outlined"
                    sx={{ margin: "auto", float: "right" }}
                    size="small"
                    onClick={() => handleCancelUser()}
                  >
                    Cancel
                  </Button>
                )}
                {connected === "Receiver pending" && (
                  <Button
                    variant="outlined"
                    sx={{ margin: "auto", float: "right" }}
                    size="small"
                    onClick={() => handleAcceptUserRequest()}
                  >
                    Accept
                  </Button>
                )}
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textTransform: "capitalize", my: "5px", ml: "20px" }}
                >
                  {userIDdetails?.first_name !== undefined &&
                  userIDdetails?.first_name
                    ? userIDdetails?.first_name + " " + userIDdetails?.last_name
                    : userIDdetails?.user?.username}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: 600, my: "8px", ml: "20px" }}
                >
                  {userIDdetails?.user?.email}
                </Typography>

                {/* Headline section */}
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  sx={{ textTransform: "capitalize", my: "5px", ml: "20px" }}
                >
                  {myheadline?.header && myheadline?.header}
                </Typography>

                {/* education section */}

                {/*  section */}
              </CardContent>
            </Card>

            {/* about section */}
            <Card sx={{ marginTop: "20px", px: "30px", py: "20px" }}>
              <Typography variant="h5">About</Typography>
              <Typography variant="body2" sx={{ marginTop: "15px" }}>
                {myabout && myabout?.description && myabout?.description}
              </Typography>
            </Card>

            {/* featured section */}
            <VisitFeatured featured={myfeatured} />

            {/* work section */}
            <VisitEducation myeducation={myeducation} />

            {/* featured section */}
            <VisitWork work={mywork} />
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default VisitProfile;
