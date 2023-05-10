import React from "react";
import { Typography, Card, CardContent, Fab } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditAbout from "./EditAbout";
import baseURL from "../../utils/baseurl";
import Spinner from "../../utils/Spinner/Spinner";

const AboutSection = ({ token, id }) => {
  const [mydetails, setmydetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          `${baseURL}api/profile/userabout/${id}/`,
          header
        );
        if (!unmounted) {
          setmydetails(request?.data);
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
    <Card sx={{ minWidth: "100%", marginTop: "30px", position: "relative" }}>
      {mydetails && mydetails?.description ? (
        <Fab
          aria-label="edit"
          size="small"
          sx={{ position: "absolute", right: 25, top: 20 }}
          onClick={handleClickOpen}
        >
          <EditIcon />
        </Fab>
      ) : (
        <Fab
          aria-label="edit"
          size="small"
          sx={{ position: "absolute", right: 25, top: 20 }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      )}
      <EditAbout
        open={open}
        handleClose={handleClose}
        token={token}
        id={id}
        data={setmydetails}
      />
      <CardContent sx={{ marginTop: "20px", marginLeft: "20px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ textTransform: "capitalize" }}
        >
          About
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "30px" }}>
          {mydetails ? (
            mydetails && mydetails?.description ? (
              mydetails?.description
            ) : (
              "Add Your About Details"
            )
          ) : (
            <Spinner />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
