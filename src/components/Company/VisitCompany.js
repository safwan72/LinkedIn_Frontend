import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Base from "../../Pages/Base";
import baseURL from "../utils/baseurl";
import Footer from "../utils/Footer/Footer";
import RenderImage from "../utils/RenderImage";
import PropTypes from "prop-types";
import CompanyHome from "./MyCompany/CompanyHome";
import CompanyAbout from "./MyCompany/CompanyAbout";
import CompanyJobs from "./MyCompany/CompanyJobs";
import { CompanyPost } from "./MyCompany/CompanyPost";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import LinkIcon from "@mui/icons-material/Link";
import CreateJob from "./MyCompany/CreateJob";
const VisitCompany = ({ token, id }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [mydetails, setmydetails] = React.useState([]);
  const [IfLiked, setIfLiked] = React.useState(false);
  const [isAdmin, setisAdmin] = React.useState(false);

  const urlParams = useParams();
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      if (urlParams?.id && id) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.get(
          `${baseURL}api/organizations/company/${urlParams?.id}/`,
          header
        );
        const request2 = await axios.get(
          `${baseURL}api/organizations/checkifFollowedCompany/${id}/${urlParams?.id}/`,
          header
        );
        const request3 = await axios.get(
          `${baseURL}api/organizations/getPageAuthorizedByUser/${id}/${urlParams?.id}/`,
          header
        );
        if (!unmounted) {
          setisAdmin(request3?.data);
          setIfLiked(request2?.data);
          setmydetails(request?.data);
          setmycover_pic(request?.data?.cover_photo);
          setmyprofile_pic(request?.data?.logo);
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token, urlParams?.id, IfLiked]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // followCompany;
  const handleFollowPage = () => {
    async function fetchData() {
      if (urlParams?.id && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/followCompany/`,
          {
            id: id,
            company: urlParams?.id,
          },
          header
        );
        setIfLiked(request?.data);
      }
    }
    fetchData();
  };
  const handleUnFollowPage = () => {
    async function fetchData() {
      if (urlParams?.id && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/unfollowCompany/`,
          {
            id: id,
            company: urlParams?.id,
          },
          header
        );
        setIfLiked(request?.data);
      }
    }
    fetchData();
  };

  return (
    <Base>
      <Container maxWidth="lg" sx={{ mt: 4, pb: "50px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ minWidth: 250, position: "relative" }}>
              <CardMedia
                component="img"
                height="120"
                image={mycover_pic}
                alt={mydetails?.created_by?.user?.username + " Cover Pic"}
                sx={{ objectFit: "cover", marginBottom: "12px" }}
              />
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
                  alt={mydetails?.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    position: "relative",
                    border: "3px solid white",
                  }}
                />
              </Box>
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
                  {mydetails?.name}
                </Typography>
                <Box>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                    sx={{ textTransform: "capitalize", my: "5px" }}
                  >
                    {mydetails?.headline}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "right",
                    marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ textTransform: "capitalize", my: "3px" }}
                  >
                    {mydetails?.follower_count +
                      `${
                        mydetails?.follower_count > 0
                          ? " Followers"
                          : " Follower"
                      }`}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ textTransform: "capitalize", my: "3px" }}
                  >
                    {mydetails?.job_count +
                      `${
                        mydetails?.job_count > 0 ? " Job Posts" : " Job Post"
                      }`}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ textTransform: "capitalize", my: "3px" }}
                  >
                    {mydetails?.post_count +
                      `${mydetails?.post_count > 0 ? " Posts" : " Post"}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      marginRight: "5px",
                    }}
                    size="small"
                    endIcon={<LinkIcon />}
                    href={mydetails?.about?.website}
                    target="_blank"
                  >
                    Visit
                  </Button>
                  {IfLiked ? (
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<DoneIcon />}
                      onClick={() => handleUnFollowPage()}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<AddIcon />}
                      onClick={() => handleFollowPage()}
                    >
                      Follow
                    </Button>
                  )}
                </Box>
                {/* {mycontactInfo?.length === 0 && (
                  <Box>
                    <Typography variant="h5" sx={{ color: "#d32f2f" }}>
                      Update Your Contact Info
                    </Typography>
                  </Box>
                )} */}
                {/* <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: 400, my: '5px' }}>
                                    Contact info, Location
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" sx={{ fontWeight: 500, my: '5px' }}>
                                    Total Connections 500+
                                </Typography> */}
              </CardContent>

              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  mt: "15px",
                  borderBottom: 1,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="About" {...a11yProps(1)} />
                <Tab label="Jobs" {...a11yProps(2)} />
                <Tab label="Posts" {...a11yProps(3)} />
              </Tabs>
            </Card>
            <Box sx={{ width: "100%", my: "10px" }}>
              {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box> */}
              <Card>
                <TabPanel value={value} index={0}>
                  <CompanyHome details={mydetails} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <CompanyAbout details={mydetails} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  {isAdmin ? (
                    <CreateJob details={mydetails} />
                  ) : (
                    <CompanyJobs details={mydetails} />
                  )}
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <CompanyPost details={mydetails} token={token} id={id} />
                </TabPanel>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default VisitCompany;
