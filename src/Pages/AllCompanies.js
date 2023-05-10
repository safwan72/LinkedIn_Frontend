import { Container, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import React from "react";
import CompanySingle from "../components/Company/CompanySingle";
import baseURL from "../components/utils/baseurl";
import Base from "./Base";
const AllCompanies = ({ token, id }) => {
  const [organizations, setorganizations] = React.useState([]);
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      if (id) {
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const request = await axios.get(
          `${baseURL}api/organizations/company/`,
          header
        );
        if (!unmounted) {
          setorganizations(request?.data);
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  return (
    <Base>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ mt: "35px" }}
          columnSpacing={{ sm: 3 }}
          rowSpacing={1}
        >
          <Grid item xs={12}>
            <Box>
              <Grid
                container
                spacing={{ xs: 1 }}
                rowSpacing={{ xs: 2 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
              >
                {organizations && organizations?.length > 0 ? (
                  organizations?.map((item, i) => {
                    return <CompanySingle item={item} key={i} id={id} />;
                  })
                ) : (
                  <Typography variant="body2" sx={{ ml: "30px", my: "20px" }}>
                    No Pages Found
                  </Typography>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default AllCompanies;
