import React from "react";
import { Typography, Card, Fab, Box, CardMedia } from "@mui/material";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditFeatured from "./EditFeatured";
import UploadFeaturedImage from "./UploadFeaturedImage";
import AddFeatured from "./AddFeatured";

const FeaturedSection = ({ token, id }) => {
  const [mydetails, setmydetails] = React.useState([]);
  const [mypic, setmypic] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openadd, setopenadd] = React.useState(false);
  const [openimageModal, setOpenimageModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleMouseOver = () => {
    setShow(true);
  };
  const handleMouseOut = () => {
    setShow(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenAdd = () => {
    setopenadd(true);
  };

  const handleCloseAdd = () => {
    setopenadd(false);
  };
  const handleClickOpenImageModal = () => {
    setOpenimageModal(true);
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
          `${baseURL}api/profile/userfeatured/${id}/`,
          header
        );
        if (!unmounted) {
          setmydetails(request?.data);
          setmypic(request?.data?.picture);
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
      if (mydetails) {
        setmypic(mydetails?.picture);
      }
    }
    fetchData();
  }, [mydetails]);
  return (
    <Card
      sx={{
        minWidth: "100%",
        marginTop: "30px",
        position: "relative",
        backgroundColor: "#FFF",
      }}
    >
      {mydetails && mydetails?.id ? (
        <Fab
          aria-label="edit"
          size="small"
          sx={{ position: "absolute", right: 25, top: 25 }}
          onClick={handleClickOpen}
        >
          <EditIcon />
        </Fab>
      ) : (
        <Fab
          aria-label="edit"
          size="small"
          sx={{ position: "absolute", right: 25, top: 25 }}
          onClick={handleClickOpenAdd}
        >
          <AddIcon />
        </Fab>
      )}
      <AddFeatured
        open={openadd}
        handleClose={handleCloseAdd}
        token={token}
        id={id}
        setmydetails={setmydetails}
        mydetails={mydetails}
      />
      <Typography
        variant="h5"
        component="div"
        sx={{ textTransform: "capitalize", my: "20px", ml: "20px", p: "15px" }}
      >
        Featured
      </Typography>
      {mydetails && mydetails?.id ? (
        <>
          <EditFeatured
            open={open}
            handleClose={handleClose}
            token={token}
            id={id}
            setmydetails={setmydetails}
            mydetails={mydetails}
          />
          <Card
            sx={{
              minWidth: "90%",
              display: "flex",
              flexWrap: "wrap",
              p: "15px 25px",
              backgroundColor: "#F9FAFB",
              margin: "auto",
            }}
          >
            <Box sx={{ position: "relative", margin: "auto" }}>
              <Fab
                aria-label="edit"
                size="small"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  display: show ? "block" : "none",
                  opacity: show ? 1 : 0,
                }}
                onClick={handleClickOpenImageModal}
              >
                <EditIcon />
              </Fab>
              <UploadFeaturedImage
                open={openimageModal}
                setopenimageModal={setOpenimageModal}
                token={token}
                id={id}
                setmydetails={setmydetails}
                mydetails={mydetails}
              />
              <CardMedia
                component="img"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                sx={{
                  maxWidth: 300,
                  maxHeight: 300,
                  width: "100%",
                  height: 200,
                  flex: 1,
                  cursor: "pointer",
                }}
                image={mypic}
                alt={mydetails?.description}
              />
            </Box>
            <Box sx={{ flex: 1, textAlign: "center", m: "20px" }}>
              <a href={mydetails?.link} target="blank">
                <Box>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {mydetails?.title}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {mydetails?.link}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    {mydetails?.description}
                  </Typography>
                </Box>
              </a>
            </Box>
          </Card>
        </>
      ) : (
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            textTransform: "capitalize",
            my: "10px",
            ml: "20px",
            p: "15px",
          }}
        >
          Edit Your Featured
        </Typography>
      )}
    </Card>
  );
};

export default FeaturedSection;
