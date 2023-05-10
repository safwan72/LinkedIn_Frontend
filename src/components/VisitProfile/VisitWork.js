import React from "react";
import { Typography, Card,  Box } from "@mui/material";
import ExperienceCard from "../Profile/Experience/ExperienceCard";

const VisitWork = ({ work }) => {
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
        Experience
      </Typography>
      <Box sx={{ ml: "20px", p: "15px" }}>
        {work?.map((item, i) => {
          return <ExperienceCard key={i} item={item} />;
        })}
      </Box>
    </Card>
  );
};

export default VisitWork;
