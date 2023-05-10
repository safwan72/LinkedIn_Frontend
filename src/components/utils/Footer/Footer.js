import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const allLinks = [
    {
      name: "About",
    },
    {
      name: "Accessibility",
    },
    {
      name: "Help Center",
    },
    {
      name: "Privacy & Terms ",
    },
    {
      name: "Ad Choices",
    },
    {
      name: "Advertising",
    },
    {
      name: "Business Services",
    },
    {
      name: "Get the LinkedIn app",
    },
    {
      name: "More",
    },
  ];
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {allLinks?.map((item, i) => {
          return (
            <Box
              key={i}
              sx={{
                marginRight: "8px",
                marginBottom: "3px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <Typography variant="caption">{item?.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="caption" sx={{ mt: "15px", fontWeight: "bold" }}>
        {" "}
        LinkedIn Corporation © 2022
      </Typography>
    </Box>
  );
};

export default Footer;
