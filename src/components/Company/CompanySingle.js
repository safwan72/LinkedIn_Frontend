import { Typography, CardMedia, Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import RenderImage from "../utils/RenderImage";

const CompanySingle = ({ item }) => {
  const [mylogo, setmylogo] = React.useState(null);
  const [mycover_photo, setmycover_photo] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setmylogo(item?.logo);
        setmycover_photo(item?.cover_photo);
      }
    }
    fetchData();
  }, [item]);
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      component={Link}
      to={`/company/${item?.id}/`}
    >
      <Card
        sx={{
          maxWidth: 400,
          position: "relative",
          margin: "auto",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="60"
          image={mycover_photo}
          alt="green iguana"
          sx={{ objectFit: "cover", marginBottom: "12px" }}
        />
        <RenderImage
          src={mylogo}
          alt="My Pic"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: 20,
            left: "50%",
            transform: " translateX(-50%)",
            borderRadius: "50%",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {item?.name}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item?.headline}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CompanySingle;
