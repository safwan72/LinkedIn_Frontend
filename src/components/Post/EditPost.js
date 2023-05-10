import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Avatar,
  Slide,
  IconButton,
  DialogTitle,
} from "@mui/material";

import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import baseURL from "../utils/baseurl";
import Spinner from "../utils/Spinner/Spinner";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditPost = ({
  myid,
  token,
  postId,
  open,
  handleClickClose,
  updatePost,
}) => {
  const theme = useTheme();
  const [post, setpost] = React.useState([]);
  const [profilePic, setprofilePic] = React.useState(null);
  const [postPic, setpostPic] = React.useState(null);
  const [post_title, setpost_title] = React.useState("");
  const [uploadpostpic, setuploadpostpic] = React.useState(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const Input = styled("input")({
    display: "none",
  });
  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (myid) {
        const request = await axios.get(
          `${baseURL}api/post/getPostById/${postId}/`,
          header
        );
        if (!unmounted) {
          setpost(request?.data);
          setpost_title(request?.data?.post_title);
          setprofilePic(request?.data?.author?.profile_pic);
          setpostPic(request?.data?.post_image);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [myid, token, postId]);
  const handleSubmit = () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let data = new FormData();
    if (uploadpostpic !== null) {
      data.append("post_image", uploadpostpic);
    }
    data.append("post_title", post_title);
    data.append("id", myid);
    data.append("post", postId);
    async function fetchData() {
      if (myid && postId) {
        const request = await axios.post(
          `${baseURL}api/post/editPost/`,
          data,
          header
        );
        updatePost(request?.data);
        handleClickClose();
        setpost_title("");
        setpostPic(null);
        setuploadpostpic(null);
        return request;
      }
    }
    fetchData();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClickClose}
      fullWidth
      scroll="paper"
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar
            aria-label={post?.author?.user?.username}
            src={profilePic}
            component={Link}
            to={`/profile-selector/${post?.author?.user?.id}/`}
          />
          <Typography
            variant="body2"
            sx={{ ml: "10px", textTransform: "capitalize" }}
          >
            {post?.author?.user?.username}
          </Typography>
        </Box>
        {handleClickClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClickClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {post && post?.id ? (
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {postPic ? (
                <Box
                  sx={{
                    height: "400px",
                    marginRight: "40px",
                    marginBottom: "30px",
                    position: "relative",
                  }}
                >
                  <label
                    htmlFor="icon-button-file"
                    style={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <Input
                      accept="image/png"
                      id="icon-button-file"
                      type="file"
                      onChange={(event) => {
                        setpostPic(URL.createObjectURL(event.target.files[0]));
                        setuploadpostpic(event.target.files[0]);
                      }}
                    />
                    {/* handlemycover_pic */}
                    <PhotoCameraIcon
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "black",
                        color: "white",
                        cursor: "pointer",
                        padding: "5px",
                        width: "1.2em",
                        height: "1.2em",
                      }}
                      aria-label="upload picture"
                    />
                  </label>
                  <img
                    src={postPic}
                    alt={post?.post_title}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : null}
              <Box sx={{ flex: 1 }}>
                {postPic === null ? (
                  <Box>
                    <label htmlFor="btn-upload">
                      <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: "none" }}
                        type="file"
                        accept="image/png"
                        onChange={(event) => {
                          setpostPic(
                            URL.createObjectURL(event.target.files[0])
                          );
                          setuploadpostpic(event.target.files[0]);
                        }}
                      />
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                      >
                        Choose Files
                      </Button>
                    </label>
                  </Box>
                ) : null}
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <label id="filled-website-input">Post Title</label>
                  <TextField
                    id="filled-website-input"
                    placeholder="Post with Title"
                    variant="outlined"
                    value={post_title}
                    fullWidth
                    type="text"
                    sx={{ mb: "15px", mt: "10px" }}
                    onChange={(e) => {
                      setpost_title(e.target.value);
                    }}
                  />
                </Box>

                <Button
                  size="small"
                  variant="contained"
                  sx={{ ml: "3px" }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Container>
        ) : (
          <Spinner />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
