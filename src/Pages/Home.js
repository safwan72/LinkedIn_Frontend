import { Container, Grid, Box } from "@mui/material";
import React from "react";
import Sidebar from "../components/Home/Sidebar";
import Main from "../components/Home/Home";
import axios from "axios";
import Base from "./Base";
import baseURL from "../components/utils/baseurl";
import Footer from "../components/utils/Footer/Footer";
import BottomSidebar from "../components/Home/BottomSidebar";

const Home = ({ token, id }) => {
  const [mydetails, setmydetails] = React.useState([]);

  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/auth/profile/${id}/`,
          header
        );
        if (!unmounted) {
          setmydetails(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);

  return (
    <>
      <Base>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              my: "20px",
              height: "100vh",
            }}
            columnSpacing={{ sm: 3 }}
            rowSpacing={1}
          >
            <Grid item xs={12} sm={3}>
              <Sidebar details={mydetails} id={id} token={token} />
              <BottomSidebar />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                height: "100%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Main />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mt: "25px" }}>
                <Footer />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Base>
    </>
  );
};

export default Home;
