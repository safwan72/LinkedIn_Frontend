import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import JobSingle from "../CompanyPosts/JobSingle";
import { useSelector } from "react-redux";
const CompanyJobs = ({ details }) => {
  const [jobs, setjobs] = React.useState([]);
  const { id, token } = useSelector((state) => state);
  React.useEffect(() => {
    async function fetchData() {
      if (details) {
        setjobs(details?.jobs);
      }
    }
    fetchData();
  }, [details]);
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 1 }}
        rowSpacing={{ xs: 2 }}
        columns={{ xs: 12 }}
      >
        {jobs && jobs?.length > 0 ? (
          jobs?.map((item, i) => {
            return <JobSingle item={item} key={i} id={id} token={token} />;
          })
        ) : (
          <Typography variant="h5" sx={{ my: "20px" }}>
            No Job Posted yet by {details?.name}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyJobs;
