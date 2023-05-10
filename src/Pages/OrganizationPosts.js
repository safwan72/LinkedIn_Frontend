import { Container, Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import FeedCompanyPost from "../components/Company/CompanyPosts/FeedCompanyPost";
import baseURL from "../components/utils/baseurl";
import Base from "./Base";

// getFollowedCompanyPosts;
const OrganizationPosts = ({ id, token }) => {
  const [organizationPosts, setorganizationPosts] = React.useState([]);
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
          `${baseURL}api/organizations/getFollowedCompanyPosts/${id}/`,
          header
        );
        if (!unmounted) {
          setorganizationPosts(request?.data);
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
      <Container maxWidth="lg" sx={{ pb: "25px" }}>
        <Grid
          container
          sx={{ mt: "35px" }}
          columnSpacing={{ sm: 3 }}
          rowSpacing={1}
        >
          {organizationPosts && organizationPosts.length > 0 ? (
            organizationPosts?.map((item, i) => {
              return (
                <FeedCompanyPost
                  item={item?.id}
                  key={i}
                  token={token}
                  id={id}
                />
              );
            })
          ) : (
            <p>Follow Pages to get Updates from Pages!!!</p>
          )}
        </Grid>
      </Container>
    </Base>
  );
};

export default OrganizationPosts;
