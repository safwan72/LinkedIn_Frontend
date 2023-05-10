import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";
import Logo from "../components/utils/Logo";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import RenderImage from "../components/utils/RenderImage";
import { styled } from "@mui/material/styles";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Link } from "react-router-dom";
import baseURL from "../components/utils/baseurl";
import Spinner from "../components/utils/Spinner/Spinner";
import { useNavigate } from "react-router";

const CreateCompany = ({ id, token }) => {
  const [mylogo, setmylogo] = React.useState(null);
  const [mycover_pic, setmycover_pic] = React.useState(null);
  const [uploadlogo, setuploadlogo] = React.useState(null);
  const [uploadcover_pic, setuploadcover_pic] = React.useState(null);
  const [status, setstatus] = React.useState("loaded");
  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      headline: "",
      description: "",
      founded: new Date(),
      size: "1-10",
      type: "Public",
      phone: "",
      location: "",
      website: "",
      industry: "",
    },
  });
  const onSubmit = (data) => {
    setstatus("loading");
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let formData = new FormData();
    if (uploadcover_pic !== null) {
      formData.append("cover_photo", uploadcover_pic);
    }
    if (uploadlogo !== null) {
      formData.append("logo", uploadlogo);
    }
    formData.append("name", data?.name ? data?.name : "");
    formData.append("headline", data?.headline ? data?.headline : "");
    formData.append("description", data?.description ? data?.description : "");
    formData.append("size", data?.size ? data?.size : "");
    formData.append("type", data?.type ? data?.type : "");
    formData.append("website", data?.website ? data?.website : "");
    formData.append("phone", data?.phone ? data?.phone : "");
    formData.append("location", data?.location ? data?.location : "");
    formData.append("industry", data?.industry ? data?.industry : "");
    formData.append(
      "founded",
      data?.founded ? moment(data?.founded).format("YYYY-MM-DD") : ""
    );
    axios
      .post(
        `${baseURL}api/organizations/createMyCompany/${id}/`,
        formData,
        header
      )
      .then((res) => {
        if (res?.status === 201 && res?.data?.created) {
          setstatus("loaded");
          setmylogo(null);
          setuploadlogo(null);
          setmycover_pic(null);
          setuploadcover_pic(null);
          navigate(`/company/${res?.data?.id}/`);
        }
        reset();
      })
      .catch((err) => {
        console.log(err.message);
        setstatus("loaded");
        setmylogo(null);
        setuploadlogo(null);
        setmycover_pic(null);
        setuploadcover_pic(null);
        reset();
        navigate(`/`);
      });
  };

  const SIZE = [
    {
      name: "10",
      value: "1-10",
    },
    {
      name: "50",
      value: "10-50",
    },
    {
      name: "100",
      value: "100-500",
    },
    {
      name: "1000",
      value: "500-1000",
    },
    {
      name: "5000",
      value: "1000-5000",
    },
    {
      name: "10000",
      value: "5000-10000",
    },
    {
      name: "10000",
      value: "10000+",
    },
  ];
  const TYPE = [
    {
      name: "Public",
      value: "Public",
    },
    {
      name: "Government",
      value: "Government",
    },
    {
      name: "Private",
      value: "Private",
    },
    {
      name: "Nonprofit",
      value: "Nonprofit",
    },
  ];

  const Input = styled("input")({
    display: "none",
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: "35px" }}>
        <Box sx={{ width: "115px" }}>
          <Link to="/">
            <Logo />
          </Link>
        </Box>
        <Box sx={{ my: "15px" }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Create Your Own Organization/Company
          </Typography>
        </Box>
        {status === "loaded" ? (
          <Box sx={{ mt: "25px" }}>
            <Card
              sx={{
                minWidth: 250,
                position: "relative",
                boxShadow: "none",
                mb: "30px",
              }}
            >
              {mycover_pic ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={mycover_pic}
                  alt="green iguana"
                  sx={{ objectFit: "cover" }}
                />
              ) : null}
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
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: 118,
                  left: "5%",
                  transform: " translateX(-5%)",
                  objectFit: "contain",
                }}
                className="profile_pic"
              >
                <RenderImage
                  src={mylogo}
                  alt="My Pic"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                />
                <label
                  htmlFor="icon-logo-file"
                  style={{ paddingBottom: "15px" }}
                >
                  <Input
                    accept="image/png"
                    id="icon-logo-file"
                    type="file"
                    onChange={(event) => {
                      setmylogo(URL.createObjectURL(event.target.files[0]));
                      setuploadlogo(event.target.files[0]);
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
              </Box>
            </Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-name-input"
                        placeholder="Enter Organization Name"
                        label="Name"
                        variant="outlined"
                        {...field}
                        fullWidth
                        required
                        type="text"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-industry-input"
                        placeholder="Enter Industry Name"
                        label="industry"
                        variant="outlined"
                        {...field}
                        fullWidth
                        required
                        type="text"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="headline"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-headline-input"
                        placeholder="Enter Organization Headline"
                        label="headline"
                        variant="outlined"
                        {...field}
                        fullWidth
                        required
                        type="text"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-description-input"
                        placeholder="Enter Organization description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        {...field}
                        fullWidth
                        type="text"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-phone-input"
                        placeholder="Phone"
                        label="Phone"
                        variant="outlined"
                        {...field}
                        fullWidth
                        type="number"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-website-input"
                        placeholder="Website"
                        label="Website"
                        variant="outlined"
                        {...field}
                        fullWidth
                        type="url"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="outlined-location-input"
                        placeholder="Location"
                        label="Location"
                        variant="outlined"
                        {...field}
                        fullWidth
                        required
                        type="text"
                        sx={{ mb: "20px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {mylogo === null ? (
                <Grid container alignItems="center" sx={{ my: "15px" }}>
                  <Grid item xs={12}>
                    <span style={{ marginRight: "10px" }}>
                      Upload Company Logo
                    </span>
                    <label
                      htmlFor="icon-logo-file"
                      style={{ paddingBottom: "15px" }}
                    >
                      <Input
                        accept="image/png"
                        id="icon-logo-file"
                        type="file"
                        onChange={(event) => {
                          setmylogo(URL.createObjectURL(event.target.files[0]));
                          setuploadlogo(event.target.files[0]);
                        }}
                      />
                      <EditIcon
                        sx={{
                          borderRadius: "50%",
                          color: "black",
                          cursor: "pointer",
                          fontSize: "1.5rem",
                          paddingTop: "8px",
                        }}
                        aria-label="upload picture"
                      />
                    </label>
                  </Grid>
                </Grid>
              ) : null}
              {mycover_pic === null ? (
                <Grid container alignItems="center" sx={{ mb: "30px" }}>
                  <Grid item xs={12}>
                    <span style={{ marginRight: "10px" }}>
                      Upload Cover Pic
                    </span>
                    <label htmlFor="icon-button-file">
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
                          fontSize: "1.5rem",
                          paddingTop: "8px",
                        }}
                        aria-label="upload picture"
                      />
                    </label>
                  </Grid>
                </Grid>
              ) : null}

              <Grid
                container
                alignItems="center"
                sx={{ my: "15px", mb: "30px" }}
              >
                <Grid item xs={12}>
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="size-select-label">Size</InputLabel>
                        <Select
                          labelId="size-select-label"
                          label="size"
                          {...field}
                          id="size-select"
                        >
                          {SIZE !== undefined &&
                            SIZE?.map((item, i) => {
                              return (
                                <MenuItem value={item?.value} key={i}>
                                  {item?.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" sx={{ mb: "25px" }}>
                <Grid item xs={12}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="type-select-label">Type</InputLabel>
                        <Select
                          labelId="type-select-label"
                          label="type"
                          id="type-select"
                          {...field}
                        >
                          {TYPE !== undefined &&
                            TYPE?.map((item, i) => {
                              return (
                                <MenuItem value={item?.value} key={i}>
                                  {item?.name}
                                </MenuItem>
                              );
                            })}{" "}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="founded"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Founded At"
                        minDate={new Date("1970-01-01")}
                        maxDate={new Date("2035-12-01")}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        mask="____/__/__"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            sx={{ mb: "25px" }}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#0A66C2",
                    color: "white",
                    marginTop: "30px",
                    minWidth: "50px",
                    padding: "10px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0d47a1",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        ) : (
          <Spinner />
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default CreateCompany;
