import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CompanyAbout = ({ details }) => {
  const [about, setabout] = React.useState([]);
  React.useEffect(() => {
    setabout(details?.about);
  }, [details]);

  return (
    <Box>
      <Box sx={{ my: "10px", mb: "15px" }}>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
          OverView
        </Typography>
        <Typography variant="subtitle2">{about?.description}</Typography>
      </Box>
      <Box sx={{ my: "10px", mb: "15px" }}>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
          Website
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "blue" }}>
          <a
            href={about?.website ? `${about?.website}/` : "/"}
            target="_blank"
            rel="noreferrer"
          >
            {about?.website}
          </a>
        </Typography>
      </Box>
      {about?.phone ? (
        <Box sx={{ my: "10px", mb: "15px" }}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
            Phone
          </Typography>
          <Typography variant="subtitle2">{about?.phone}</Typography>
        </Box>
      ) : null}
      {about?.industry ? (
        <Box sx={{ my: "10px", mb: "15px" }}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
            Industry
          </Typography>
          <Typography variant="subtitle2">{about?.industry}</Typography>
        </Box>
      ) : null}
      {about?.size ? (
        <Box sx={{ my: "10px", mb: "15px" }}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
            Employees
          </Typography>
          <Typography variant="subtitle2">{about?.size}</Typography>
        </Box>
      ) : null}
      {about?.location ? (
        <Box sx={{ my: "10px", mb: "15px" }}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
            Headquarters
          </Typography>
          <Typography variant="subtitle2">{about?.location}</Typography>
        </Box>
      ) : null}

      <Box sx={{ my: "10px", mb: "15px" }}>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
          Founded
        </Typography>
        <Typography variant="subtitle2">
          {new Date(
            `${about?.founded ? about?.founded : new Date()}`
          ).getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyAbout;
