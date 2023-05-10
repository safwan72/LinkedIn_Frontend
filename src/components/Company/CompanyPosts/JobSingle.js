import React from "react";
import { Card, Box, Typography, Grid, Button, IconButton } from "@mui/material";
import Spinner from "../../utils/Spinner/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import { useSelector } from "react-redux";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
const JobSingle = ({ item }) => {
  const [mylogo, setmylogo] = React.useState(null);
  const [ifApplied, setifApplied] = React.useState(false);
  const [ifSaved, setifSaved] = React.useState(false);
  const { id, token } = useSelector((state) => state);
  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setmylogo(item?.posted_by?.logo);
      }
    }
    fetchData();
  }, [item]);
  // checkSaveStatus;
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.get(
          `${baseURL}api/organizations/checkAppliedStatus/${id}/${item?.posted_by?.id}/${item?.id}/`,
          header
        );
        if (!unmounted) {
          setifApplied(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, id, token]);
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.get(
          `${baseURL}api/organizations/checkSaveStatus/${id}/${item?.id}/`,
          header
        );
        console.log(request);
        if (!unmounted) {
          setifSaved(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, id, token]);

  const handleApply = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/applytoJob/`,
          {
            id: id,
            company: item?.posted_by?.id,
            job: item?.id,
          },
          header
        );
        setifApplied(request?.data);
        return request;
      }
    }
    fetchData();
  };
  const handleSave = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/saveJob/`,
          {
            id: id,
            job: item?.id,
          },
          header
        );
        setifSaved(request?.data);
        return request;
      }
    }
    fetchData();
  };
  const handlecancelSave = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/cancelSaveJob/`,
          {
            id: id,
            job: item?.id,
          },
          header
        );
        console.log(request);
        setifSaved(request?.data);
        return request;
      }
    }
    fetchData();
  };
  const handleAppliedButton = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/cancelApplyJob/`,
          {
            id: id,
            company: item?.posted_by?.id,
            job: item?.id,
          },
          header
        );
        setifApplied(request?.data);
        return request;
      }
    }
    fetchData();
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          marginTop: "20px",
        }}
      >
        {item ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              component={Link}
              to={`/company/${item?.posted_by?.id}/`}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "15px",
                marginTop: "10px",
                alignItems: "center",
                py: "10px",
              }}
            >
              <Box sx={{ marginRight: "15px" }}>
                <img
                  alt={item?.posted_by?.name}
                  src={mylogo}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <Typography variant="body2">{item?.posted_by?.name}</Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "10px", marginLeft: "20px" }}>
              <Box sx={{ marginBottom: "8px" }}>
                <Typography
                  variant="h6"
                  //   onClick={handleClickOpen}
                  sx={{ cursor: "pointer" }}
                >
                  {item?.job_title}
                </Typography>
                <Box
                  sx={{
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    //   onClick={handleClickOpen}
                    sx={{ mb: "10px" }}
                  >
                    Job Description
                  </Typography>
                  <Typography
                    variant="caption"
                    //   onClick={handleClickOpen}
                    sx={{ mb: "10px", whiteSpace: "pre-line" }}
                  >
                    {item?.job_description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    my: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {ifApplied ? (
                    <Button
                      variant="contained"
                      onClick={() => handleAppliedButton()}
                    >
                      Applied
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={() => handleApply()}>
                      Apply
                    </Button>
                  )}
                  {ifSaved ? (
                    <IconButton size="large" onClick={() => handlecancelSave()}>
                      <BookmarkAddSharpIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <IconButton size="large" onClick={() => handleSave()}>
                      <BookmarkAddOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </Card>
    </Grid>
  );
};

export default JobSingle;
