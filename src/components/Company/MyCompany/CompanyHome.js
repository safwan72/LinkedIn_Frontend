import { Box, Typography } from "@mui/material";
import React from "react";
function truncateString(str, num) {
  if (str) {
    if (str.length > num) {
      return str.slice(0, num) + "... See More";
    } else {
      return str;
    }
  }
}
const CompanyHome = ({ details }) => {
  const [about, setabout] = React.useState([]);
  React.useEffect(() => {
    setabout(details?.about);
  }, [details]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Box>
        <Typography variant="subtitle2">
          {truncateString(about?.description, 190)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyHome;
