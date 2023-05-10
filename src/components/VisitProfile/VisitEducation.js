import React from "react";
import { Typography, Card, Box } from "@mui/material";
import EducationCard from "../Profile/Education/EducationCard";

const VisitEducation = ({ myeducation }) => {
  return (
    <Card
      sx={{
        minWidth: "100%",
        marginTop: "30px",
        position: "relative",
        backgroundColor: "#FFF",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ textTransform: "capitalize", mt: "20px", ml: "20px", p: "15px" }}
      >
        Education
      </Typography>
      <Box sx={{ ml: "20px", p: "15px" }}>
        {myeducation?.map((item, i) => {
          return <EducationCard key={i} item={item} />;
        })}
      </Box>
    </Card>
  );
};

export default VisitEducation;
