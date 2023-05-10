import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import CompanyPostSingle from "./CompanyPostSingle";
export const CompanyPost = ({ details, id, token }) => {
  const [companyPosts, setcompanyPosts] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      if (details) {
        setcompanyPosts(details?.posts);
      }
    }
    fetchData();
  }, [details]);
  console.log(companyPosts);
  return (
    <Box sx={{ p: "10px" }}>
      <Grid
        container
        spacing={{ xs: 1 }}
        rowSpacing={{ xs: 2 }}
        columns={{ xs: 1 }}
        sx={{ pt: "10px" }}
      >
        {companyPosts && companyPosts?.length > 0 ? (
          companyPosts?.map((item, i) => {
            return (
              <CompanyPostSingle item={item} key={i} id={id} token={token} />
            );
          })
        ) : (
          <Typography variant="h5" sx={{ my: "20px" }}>
            No Posts yet by {details?.name}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};
