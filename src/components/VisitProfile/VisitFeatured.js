import React from "react";
import { Typography, Card, Box, CardMedia } from "@mui/material";

const VisitFeatured = ({ featured }) => {
  const [mydetails, setmydetails] = React.useState([]);
  const [mypic, setmypic] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      if (featured) {
        setmydetails(featured);
        setmypic(featured?.picture);
        return;
      }
    }
    fetchData();
  }, [featured]);
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
        sx={{ textTransform: "capitalize", my: "20px", ml: "20px", p: "10px" }}
      >
        Featured
      </Typography>
      {mydetails && (
        <Card
          sx={{
            minWidth: "90%",
            display: "flex",
            flexWrap: "wrap",
            p: "15px 25px",
            backgroundColor: "#F9FAFB",
            margin: "auto",
          }}
        >
          {mydetails && mypic && (
            <CardMedia
              component="img"
              sx={{
                maxWidth: 300,
                maxHeight: 300,
                width: "100%",
                height: 200,
                flex: 1,
                cursor: "pointer",
              }}
              image={mypic}
              alt={mydetails?.description}
            />
          )}
          <Box sx={{ flex: 1, textAlign: "center", m: "20px" }}>
            <a href={mydetails?.link} target="blank">
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textTransform: "capitalize" }}
                >
                  {mydetails?.title}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {mydetails?.link}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px" }}>
                  {mydetails?.description}
                </Typography>
              </Box>
            </a>
          </Box>
        </Card>
      )}
    </Card>
  );
};

export default VisitFeatured;
