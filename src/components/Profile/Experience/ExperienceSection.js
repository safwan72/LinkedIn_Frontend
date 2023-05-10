import React from "react";
import { Typography, Card, Fab, Box } from "@mui/material";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import AddIcon from "@mui/icons-material/Add";
import ExperienceCard from "./ExperienceCard";
import AddNewExp from "./AddNewExp";
const ExperienceSection = ({ token, id }) => {
  const [mydetails, setmydetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/profile/userwork/${id}/`,
          header
        );
        setmydetails(request?.data);
        return request;
      }
    }
    fetchData();
  }, [id, token]);
  return (
    <Card
      sx={{
        minWidth: "100%",
        marginTop: "30px",
        position: "relative",
        backgroundColor: "#FFF",
      }}
    >
      <Fab
        aria-label="edit"
        size="small"
        sx={{ position: "absolute", right: 25, top: 25 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <AddNewExp
        open={open}
        handleClose={handleClose}
        token={token}
        id={id}
        setmydetails={setmydetails}
      />
      <Typography
        variant="h5"
        component="div"
        sx={{ textTransform: "capitalize", mt: "20px", ml: "20px", p: "15px" }}
      >
        Experience
      </Typography>
      <Box sx={{ ml: "20px", p: "15px" }}>
        {mydetails?.map((item, i) => {
          return <ExperienceCard key={i} item={item} />;
        })}
      </Box>
      {/* <EditFeatured open={open} handleClose={handleClose} token={token} id={id} setmydetails={setmydetails} mydetails={mydetails} /> */}
      {/* <Card sx={{ minWidth: "90%", display: 'flex', flexWrap: 'wrap', p: '15px 25px', backgroundColor: '#F9FAFB', margin: 'auto' }}>
                <Box sx={{ position: 'relative', margin: 'auto' }}>
                    <Fab aria-label="edit" size="small" sx={{
                        position: 'absolute', right: 0, top: 0, display: show ?
                            'block' : 'none', opacity: show ?
                                1 : 0,
                    }} onClick={handleClickOpenImageModal}>
                        <EditIcon />
                    </Fab>
                    <UploadFeaturedImage open={openimageModal} setopenimageModal={setOpenimageModal} token={token} id={id} setmydetails={setmydetails} mydetails={mydetails} />
                    <CardMedia
                        component="img"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        sx={{
                            maxWidth: 300, maxHeight: 300, width: "100%", height: 200, flex: 1,
                            cursor: 'pointer'
                        }}
                        image={mypic}
                        alt={mydetails?.description}
                    />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center', m: '20px' }}>
                    <a href={mydetails?.link} target='blank'>
                        <Box>
                            <Typography variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                {mydetails?.title}
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                {mydetails?.link}
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: '10px' }}>
                                {mydetails?.description}
                            </Typography>

                        </Box>
                    </a>
                </Box>
            </Card> */}
    </Card>
  );
};

export default ExperienceSection;
