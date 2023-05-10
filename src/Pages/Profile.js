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
import AboutSection from "../components/Profile/About/AboutSection";
import FeaturedSection from "../components/Profile/Featured/FeaturedSection";
import ExperienceSection from "../components/Profile/Experience/ExperienceSection";
import EducationSection from "../components/Profile/Education/EducationSection";
import SkillSection from "../components/Profile/Skill/SkillSection";
import baseURL from "../components/utils/baseurl";
import EditIcon from "@mui/icons-material/Edit";
import "../components/CSS/profile.css";
import EditProfileDetails from "../components/Profile/EditProfileDetails";
import EditHeadline from "../components/Profile/EditHeadline";
import RenderImage from "../components/utils/RenderImage";
import { styled } from "@mui/material/styles";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Footer from "../components/utils/Footer/Footer";
const Profile = ({ token, id }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [mydetails, setmydetails] = React.useState([]);
  const [myheadline, setmyheadline] = React.useState([]);
  const [mycontactInfo, setmycontactInfo] = React.useState([]);
  const [openheaderedit, setopenheaderedit] = React.useState(false);
  const [openprofileEdit, setopenprofileEdit] = React.useState(false);
  const [uploadprofilepic, setuploadprofilepic] = React.useState(null);
  const [uploadcover_pic, setuploadcover_pic] = React.useState(null);

  const handleopenheaderedit = () => {
    setopenheaderedit(!openheaderedit);
  };
  const handlemycover_pic = () => {
    let formData = new FormData();
    if (uploadcover_pic !== null) {
      formData.append("cover_pic", uploadcover_pic);
      formData.append("user", id);
    }
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      const request = await axios.post(
        `${baseURL}api/auth/uploadCoverPic/`,
        formData,
        header
      );

      if (request.status === 200) {
        setmycover_pic(request?.data?.cover_pic);
        setuploadcover_pic(null);
      }
      setuploadcover_pic(null);
    }
    fetchData();
  };
  const handleopenprofilepic = () => {
    let formData = new FormData();
    if (uploadprofilepic !== null) {
      formData.append("profile_pic", uploadprofilepic);
      formData.append("user", id);
    }
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      const request = await axios.post(
        `${baseURL}api/auth/uploadProfilePic/`,
        formData,
        header
      );
      if (request.status === 200) {
        setmyprofile_pic(request?.data?.profile_pic);
        setuploadprofilepic(null);
      }
      setuploadprofilepic(null);
    }
    fetchData();
  };
  const handleprofileEdit = () => {
    setopenprofileEdit(!openprofileEdit);
  };
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
          `${baseURL}api/auth/profile/${id}/`,
          header
        );
        const request2 = await axios.get(
          `${baseURL}api/profile/headline/${id}/`,
          header
        );
        const request3 = await axios.get(
          `${baseURL}api/profile/contactinfo/${id}/`,
          header
        );
        if (!unmounted) {
          setmycontactInfo(request3?.data);
          setmyheadline(request2?.data);
          setmydetails(request?.data);
          setmyprofile_pic(request?.data?.profile_pic);
          setmycover_pic(request?.data?.cover_pic);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  const Input = styled("input")({
    display: "none",
  });

  return (
    <Base>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ minWidth: 250, position: "relative" }}>
              <CardMedia
                component="img"
                height="120"
                image={mycover_pic}
                alt={mydetails?.user?.username + " Cover Pic"}
                sx={{ objectFit: "cover", marginBottom: "12px" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  transform: " translateX(-15%,-15%)",
                  objectFit: "contain",
                }}
              >
                <label
                  htmlFor="icon-button-file"
                  style={{ paddingBottom: "15px" }}
                >
                  <Input
                    accept="image/png"
                    id="icon-button-file"
                    type="file"
                    onChange={(event) => {
                      setmycover_pic(
                        URL.createObjectURL(event.target.files[0])
                      );
                      setuploadcover_pic(event.target.files[0]);
                    }}
                  />
                  {/* handlemycover_pic */}
                  <CameraAltOutlinedIcon
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: "white",
                      color: "black",
                      cursor: "pointer",
                      padding: "5px",
                      width: "1.2em",
                      height: "1.2em",
                    }}
                    aria-label="upload picture"
                  />
                </label>
                {uploadcover_pic !== null && (
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      backgroundColor: "#0d47a1",
                      color: "white",
                      padding: "3px",
                      marginLeft: "10px",
                      lineHeight: 1.5,
                      position: "absolute",
                      top: 30,
                      right: 10,
                      "&:hover": {
                        backgroundColor: "#0A66C2",
                      },
                    }}
                    size="small"
                    onClick={handlemycover_pic}
                  >
                    Save
                  </Button>
                )}
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: 65,
                  left: "5%",
                  transform: " translateX(-5%)",
                  objectFit: "contain",
                }}
                className="profile_pic"
              >
                <RenderImage
                  src={myprofile_pic}
                  alt={mydetails?.user?.username}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    position: "relative",
                    border: "3px solid white",
                  }}
                />
                <label
                  htmlFor="icon-profile-file"
                  style={{ paddingBottom: "15px" }}
                >
                  <Input
                    accept="image/png"
                    id="icon-profile-file"
                    type="file"
                    onChange={(event) => {
                      setmyprofile_pic(
                        URL.createObjectURL(event.target.files[0])
                      );
                      setuploadprofilepic(event.target.files[0]);
                    }}
                  />
                  <EditIcon
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      padding: "5px",
                      borderRadius: "50%",
                      backgroundColor: "gray",
                      width: "1.2em",
                      height: "1.2em",
                    }}
                    className="profile_pic_edit"
                    aria-label="upload picture"
                  />
                </label>
                {uploadprofilepic !== null && (
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      backgroundColor: "#0d47a1",
                      color: "white",
                      padding: "3px",
                      marginLeft: "10px",
                      lineHeight: 1.5,
                      "&:hover": {
                        backgroundColor: "#0A66C2",
                      },
                    }}
                    size="small"
                    onClick={handleopenprofilepic}
                  >
                    Save
                  </Button>
                )}
              </Box>
              <Fab
                aria-label="edit"
                size="small"
                sx={{ position: "absolute", right: 25, top: 130 }}
                onClick={handleprofileEdit}
              >
                <EditIcon />
              </Fab>
              {openprofileEdit ? (
                <EditProfileDetails
                  open={openprofileEdit}
                  handleClose={handleprofileEdit}
                  token={token}
                  id={id}
                  setmydetails={setmydetails}
                  mydetails={mydetails}
                  setmycontactInfo={setmycontactInfo}
                  mycontactInfo={mycontactInfo}
                />
              ) : null}
              <CardContent
                sx={{
                  marginTop: "70px",
                  marginLeft: "20px",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textTransform: "capitalize" }}
                >
                  {mydetails?.first_name !== undefined && mydetails?.first_name
                    ? mydetails?.first_name + " " + mydetails?.last_name
                    : mydetails?.user?.username}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                    sx={{ textTransform: "capitalize", my: "5px" }}
                  >
                    {myheadline?.header ? myheadline?.header : "Edit HeadLine"}
                  </Typography>
                  <Box
                    onClick={handleopenheaderedit}
                    sx={{ cursor: "pointer" }}
                  >
                    <EditIcon
                      sx={{ width: "0.8em", height: "0.8em", ml: "8px" }}
                    />
                  </Box>
                  {openheaderedit ? (
                    <EditHeadline
                      open={openheaderedit}
                      handleClose={handleopenheaderedit}
                      token={token}
                      id={id}
                      setmyheadline={setmyheadline}
                      myheader={myheadline}
                    />
                  ) : null}
                </Box>
                {mycontactInfo?.length === 0 && (
                  <Box>
                    <Typography variant="h5" sx={{ color: "#d32f2f" }}>
                      Update Your Contact Info
                    </Typography>
                  </Box>
                )}
                {/* <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: 400, my: '5px' }}>
                                    Contact info, Location
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: 500, my: '5px' }}>
                                    Total Connections 500+
                                </Typography> */}
              </CardContent>
            </Card>
            <AboutSection token={token} id={id} />
            <FeaturedSection token={token} id={id} />
            <ExperienceSection token={token} id={id} />
            <EducationSection token={token} id={id} />
            <SkillSection token={token} id={id} />
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

export default Profile;
