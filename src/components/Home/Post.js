import { Box, Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddPost from "./AddPost";
import { makeStyles } from "@mui/styles";
import baseURL from "../utils/baseurl";
const useStyles = makeStyles((theme) => ({
  inputbox: {
    padding: "15px",
    width: "93%",
    borderRadius: "12px",
    outline: "none",
    backgroundColor: " #d4d4d4",
    border: "1px solid #d4d4d4",
    display: "inline-flex",
  },
  spantext: {
    color: "#6c757d",
  },
}));
const Post = ({ reload, reloader }) => {
  const id = useSelector((state) => state.id);
  const token = useSelector((state) => state.token);
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [mydata, setmydata] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          setmydata(request?.data);
          setmyprofile_pic(request?.data?.profile_pic);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token]);
  const classes = useStyles();
  return (
    <Card sx={{ padding: "12px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ marginRight: "8px" }}>
          <img
            src={myprofile_pic}
            alt="My Pic"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <button className={classes.inputbox} onClick={handleClickOpen}>
            <span className={classes.spantext}>Start a post</span>
          </button>
        </Box>
      </Box>
      <AddPost
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        mydata={mydata}
        reload={reload}
        reloader={reloader}
      />
    </Card>
  );
};

export default Post;
