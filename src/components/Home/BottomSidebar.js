import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
const BottomSidebar = () => {
  return (
    <Card sx={{ maxWidth: 400, position: "relative", mt: "10px" }}>
      <CardContent sx={{ pt: "20px" }}>
        <Typography
          variant="caption"
          component="a"
          sx={{
            textTransform: "capitalize",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            cursor: "pointer",
            width: "100%",
          }}
        >
          recent
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="a"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Groups
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="a"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "block",
            cursor: "pointer",
          }}
        >
          Events
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="a"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "block",
            cursor: "pointer",
          }}
        >
          Hashtags
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BottomSidebar;
