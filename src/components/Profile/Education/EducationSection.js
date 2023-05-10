import React from "react";
import { Typography, Card, Fab, Box } from "@mui/material";
import axios from "axios";
import baseURL from "../../utils/baseurl";

import AddIcon from "@mui/icons-material/Add";
import EducationCard from "./EducationCard";
import AddNewEducation from "./AddNewEducation";
const EducationSection = ({ token, id }) => {
  const [mydetails, setmydetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/profile/useredu/${id}/`,
          header
        );
        setmydetails(request?.data);
        return request;
      }
    }
    fetchData();
  }, [id, token]);
  return (
    <Card
      sx={{
        minWidth: "100%",
        marginTop: "30px",
        position: "relative",
        backgroundColor: "#FFF",
      }}
    >
      <Fab
        aria-label="edit"
        size="small"
        sx={{ position: "absolute", right: 25, top: 25 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <AddNewEducation
        open={open}
        handleClose={handleClose}
        token={token}
        id={id}
        setmydetails={setmydetails}
      />
      <Typography
        variant="h5"
        component="div"
        sx={{ textTransform: "capitalize", mt: "20px", ml: "20px", p: "15px" }}
      >
        Education
      </Typography>
      <Box sx={{ ml: "20px", p: "15px" }}>
        {mydetails?.map((item, i) => {
          return <EducationCard key={i} item={item} />;
        })}
      </Box>
    </Card>
  );
};

export default EducationSection;
